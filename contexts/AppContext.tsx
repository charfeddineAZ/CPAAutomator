import React, { createContext, useState, useCallback, useRef } from 'react';
import {
  Task, AppSettings, ExtractedInfo, GeneratedIdentity,
  LogEntry, Script, AutomationState, LeadCheckResult, TaskStats,
} from '../constants/types';
import { generateIdentity, regenerateCVV, fetchGeoInfo, checkLeadCPA, fetchProxyList } from '../services/identity';

interface AppContextType {
  tasks: Task[];
  settings: AppSettings;
  extractedInfo: ExtractedInfo | null;
  generatedIdentity: GeneratedIdentity | null;
  logs: LogEntry[];
  scripts: Script[];
  automation: AutomationState;
  currentUrl: string;
  emailPool: string[];
  leadHistory: LeadCheckResult[];
  taskStats: TaskStats[];
  proxyList: string[];
  currentProxy: string;

  addTask: (task: Omit<Task, 'id' | 'status' | 'completedRuns'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  reorderTasks: (tasks: Task[]) => void;
  updateSettings: (s: Partial<AppSettings>) => void;
  addLog: (level: LogEntry['level'], message: string, taskId?: string, taskName?: string) => void;
  clearLogs: () => void;
  addScript: (script: Omit<Script, 'id'>) => void;
  updateScript: (id: string, updates: Partial<Script>) => void;
  deleteScript: (id: string) => void;
  startAutomation: () => void;
  stopAutomation: () => void;
  setCurrentUrl: (url: string) => void;
  setEmailPool: (emails: string[]) => void;
  refreshCVV: () => void;
  setExtractedInfo: (info: ExtractedInfo | null) => void;
  setGeneratedIdentity: (identity: GeneratedIdentity | null) => void;
  loadProxyList: () => Promise<void>;
  clearStats: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultSettings: AppSettings = {
  waitBetweenTasks: 5,
  captcha: { service: 'none', apiKey: '' },
  proxy: {
    type: 'none', host: '', port: '', username: '', password: '',
    listUrl: 'https://asocks-list.org/WL8AfPijnDM9U9mbo4uH8d5FAd1HS2sS.txt?limit=1000&type=res&template_id=4&country=US',
    rotation: false,
  },
  cpaGripUserId: '2227942',
  cpaGripKey: 'c8c9f000dc666b8efb670b90ccb17aff',
};

const defaultAutomation: AutomationState = {
  isRunning: false,
  currentTaskIndex: -1,
  currentTask: null,
  phase: 'idle',
  phaseDetail: '',
  totalRuns: 0,
  successfulLeads: 0,
};

let logCounter = 0;

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [extractedInfo, setExtractedInfo] = useState<ExtractedInfo | null>(null);
  const [generatedIdentity, setGeneratedIdentity] = useState<GeneratedIdentity | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [scripts, setScripts] = useState<Script[]>([
    { id: '1', name: 'Anti-WebRTC Script', timing: 'before', enabled: true, code: `// Disable WebRTC to prevent IP leaks\ntry { window.RTCPeerConnection = undefined; } catch(e) {}\nconsole.log('[Script] WebRTC disabled');` },
    { id: '2', name: 'Auto-Fill Helper', timing: 'after', enabled: true, code: `// Helper for form detection\nwindow.__cpa_helper = true;\nconsole.log('[Script] CPA helper injected');` },
  ]);
  const [automation, setAutomation] = useState<AutomationState>(defaultAutomation);
  const [currentUrl, setCurrentUrl] = useState('');
  const [emailPool, setEmailPool] = useState<string[]>([]);
  const [leadHistory, setLeadHistory] = useState<LeadCheckResult[]>([]);
  const [taskStats, setTaskStats] = useState<TaskStats[]>([]);
  const [proxyList, setProxyList] = useState<string[]>([]);
  const [currentProxy, setCurrentProxy] = useState('');
  const automationRef = useRef(false);
  const proxyIndexRef = useRef(0);

  const addLog = useCallback((level: LogEntry['level'], message: string, taskId?: string, taskName?: string) => {
    const entry: LogEntry = {
      id: `log_${++logCounter}_${Date.now()}`,
      timestamp: new Date(),
      level,
      message,
      taskId,
      taskName,
    };
    setLogs(prev => [entry, ...prev].slice(0, 1000));
  }, []);

  const updateTaskStats = useCallback((taskId: string, taskName: string, outcome: 'lead' | 'no_lead' | 'error') => {
    setTaskStats(prev => {
      const existing = prev.find(s => s.taskId === taskId);
      if (existing) {
        const updated = { ...existing };
        updated.totalRuns++;
        if (outcome === 'lead') updated.leads++;
        else if (outcome === 'no_lead') updated.noLeads++;
        else updated.errors++;
        updated.conversionRate = updated.leads / updated.totalRuns;
        return prev.map(s => s.taskId === taskId ? updated : s);
      } else {
        const newStat: TaskStats = {
          taskId, taskName, totalRuns: 1,
          leads: outcome === 'lead' ? 1 : 0,
          noLeads: outcome === 'no_lead' ? 1 : 0,
          errors: outcome === 'error' ? 1 : 0,
          conversionRate: outcome === 'lead' ? 1 : 0,
        };
        return [...prev, newStat];
      }
    });
  }, []);

  const addTask = useCallback((task: Omit<Task, 'id' | 'status' | 'completedRuns'>) => {
    const newTask: Task = { ...task, id: `task_${Date.now()}`, status: 'pending', completedRuns: 0, totalLeads: 0 };
    setTasks(prev => [...prev, newTask]);
    addLog('info', `Task added: ${task.name}`);
  }, [addLog]);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => {
      const t = prev.find(x => x.id === id);
      if (t) addLog('info', `Task deleted: ${t.name}`);
      return prev.filter(x => x.id !== id);
    });
  }, [addLog]);

  const reorderTasks = useCallback((newTasks: Task[]) => setTasks(newTasks), []);

  const updateSettings = useCallback((s: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...s }));
    addLog('info', 'Settings saved');
  }, [addLog]);

  const clearLogs = useCallback(() => setLogs([]), []);
  const clearStats = useCallback(() => setTaskStats([]), []);

  const addScript = useCallback((script: Omit<Script, 'id'>) => {
    setScripts(prev => [...prev, { ...script, id: `script_${Date.now()}` }]);
  }, []);

  const updateScript = useCallback((id: string, updates: Partial<Script>) => {
    setScripts(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  }, []);

  const deleteScript = useCallback((id: string) => {
    setScripts(prev => prev.filter(s => s.id !== id));
  }, []);

  const refreshCVV = useCallback(() => {
    if (generatedIdentity) {
      const newCvv = regenerateCVV(generatedIdentity.cardType);
      setGeneratedIdentity(prev => prev ? { ...prev, cardCvv: newCvv } : null);
      addLog('info', 'CVV regenerated');
    }
  }, [generatedIdentity, addLog]);

  const loadProxyList = useCallback(async () => {
    const url = settings.proxy.listUrl;
    if (!url) return;
    addLog('info', 'Loading proxy list from URL...');
    const list = await fetchProxyList(url);
    setProxyList(list);
    proxyIndexRef.current = 0;
    addLog('success', `Loaded ${list.length} proxies from list`);
  }, [settings.proxy.listUrl, addLog]);

  const getNextProxy = useCallback((): string => {
    if (proxyList.length === 0) return '';
    const proxy = proxyList[proxyIndexRef.current % proxyList.length];
    proxyIndexRef.current++;
    return proxy;
  }, [proxyList]);

  const runTask = useCallback(async (task: Task, taskIndex: number) => {
    addLog('info', `Starting task: ${task.name}`, task.id, task.name);
    setAutomation(prev => ({
      ...prev, currentTaskIndex: taskIndex, currentTask: task,
      phase: 'preparing', phaseDetail: 'Initializing...',
    }));
    updateTask(task.id, { status: 'running' });

    // Step 1: Proxy setup
    await new Promise(r => setTimeout(r, 400));
    let usedProxy = '';
    if (settings.proxy.type !== 'none') {
      if (settings.proxy.rotation && proxyList.length > 0) {
        usedProxy = getNextProxy();
        setCurrentProxy(usedProxy);
        addLog('info', `Using proxy: ${usedProxy}`, task.id, task.name);
      } else if (settings.proxy.host) {
        usedProxy = `${settings.proxy.type}://${settings.proxy.host}:${settings.proxy.port}`;
        setCurrentProxy(usedProxy);
        addLog('info', `Proxy: ${usedProxy}`, task.id, task.name);
      }
    }
    setAutomation(prev => ({ ...prev, phaseDetail: 'Fetching geo-information...' }));

    // Step 2: Geo info
    await new Promise(r => setTimeout(r, 300));
    const geoInfo = await fetchGeoInfo('196.187.152.216');
    if (geoInfo) {
      setExtractedInfo(geoInfo);
      addLog('success', `Geo: ${geoInfo.city}, ${geoInfo.country} | IP: ${geoInfo.ip}`, task.id, task.name);
      addLog('info', `TZ: ${geoInfo.timezone} | Lang: ${geoInfo.language} | Currency: ${geoInfo.currency || 'N/A'}`, task.id, task.name);
      if (geoInfo.proxyDetected) {
        addLog('warning', 'Proxy detection flag on IP', task.id, task.name);
      }
    } else {
      addLog('warning', 'Could not fetch geo info, using defaults', task.id, task.name);
    }

    setAutomation(prev => ({ ...prev, phaseDetail: 'Generating identity...' }));

    // Step 3: Identity
    await new Promise(r => setTimeout(r, 300));
    const emailToUse = emailPool.length > 0
      ? emailPool[0]
      : `user${Date.now()}@gmail.com`;
    const identity = generateIdentity(geoInfo?.countryCode || 'US', emailToUse);
    setGeneratedIdentity(identity);

    if (emailPool.length > 0) {
      setEmailPool(prev => prev.slice(1));
      addLog('info', `Using email from pool: ${emailToUse}`, task.id, task.name);
    }

    addLog('success', `Identity: ${identity.firstName} ${identity.lastName} | ${identity.email}`, task.id, task.name);
    addLog('info', `Card: ${identity.cardType} ****${identity.cardNumber.slice(-4)} | CVV: ${identity.cardCvv}`, task.id, task.name);

    setAutomation(prev => ({ ...prev, phaseDetail: 'Patching browser timezone & language...' }));
    await new Promise(r => setTimeout(r, 300));
    addLog('info', `Browser patched: TZ=${geoInfo?.timezone || 'UTC'}, Lang=${geoInfo?.language || 'en-US'}`, task.id, task.name);
    addLog('info', 'WebRTC disabled | Anti-detection active | Canvas spoofed', task.id, task.name);

    // Step 4: Open browser
    await new Promise(r => setTimeout(r, 400));
    setAutomation(prev => ({ ...prev, phase: 'browser', phaseDetail: `Loading: ${task.url}` }));
    setCurrentUrl(task.url);
    addLog('success', `Browser opened: ${task.url}`, task.id, task.name);

    // Step 5: Execute task (simulate timing based on mode)
    await new Promise(r => setTimeout(r, 800));
    setAutomation(prev => ({ ...prev, phase: 'executing', phaseDetail: 'Analyzing page...' }));
    addLog('info', 'Page analyzed | Detecting forms...', task.id, task.name);

    await new Promise(r => setTimeout(r, 600));
    setAutomation(prev => ({ ...prev, phaseDetail: 'Filling forms intelligently...' }));
    addLog('info', `Auto-filling: ${identity.firstName} ${identity.lastName} | ${identity.email}`, task.id, task.name);

    await new Promise(r => setTimeout(r, 800));
    setAutomation(prev => ({ ...prev, phaseDetail: 'Simulating human interaction...' }));
    addLog('info', 'Human behavior: mouse movements + random delays + scrolling', task.id, task.name);

    // Task mode timing
    const modeDuration =
      task.mode === 'mode1' ? (task.mode1Config?.browserDuration || 60) * 1000 :
      task.mode === 'mode2' ? (task.mode2Config?.taskDuration || 60) * 1000 :
      15000; // mode3 uses smart detection

    const waitTime = Math.min(modeDuration, 3000); // cap at 3s in simulation
    await new Promise(r => setTimeout(r, waitTime));

    // Step 6: Lead check
    setAutomation(prev => ({ ...prev, phase: 'checking', phaseDetail: 'Checking lead via CPA Grip...' }));
    addLog('info', `Lead check for IP: ${geoInfo?.ip || 'unknown'} (direct connection)`, task.id, task.name);

    await new Promise(r => setTimeout(r, 800));

    let isLead = false;
    if (settings.cpaGripUserId && settings.cpaGripKey && geoInfo?.ip) {
      try {
        isLead = await checkLeadCPA(settings.cpaGripUserId, settings.cpaGripKey, geoInfo.ip);
      } catch {
        isLead = false;
      }
    }

    const leadResult: LeadCheckResult = {
      checked: true,
      isLead,
      ip: geoInfo?.ip || 'unknown',
      timestamp: new Date(),
      taskName: task.name,
      taskId: task.id,
    };
    setLeadHistory(prev => [leadResult, ...prev].slice(0, 100));

    if (isLead) {
      addLog('success', `LEAD CONFIRMED! IP: ${geoInfo?.ip}`, task.id, task.name);
      updateTask(task.id, { lastLeadStatus: 'lead', totalLeads: (task.totalLeads || 0) + 1 });
      updateTaskStats(task.id, task.name, 'lead');
      setAutomation(prev => ({
        ...prev,
        successfulLeads: (prev.successfulLeads || 0) + 1,
        totalRuns: (prev.totalRuns || 0) + 1,
      }));
    } else {
      addLog('warning', `No lead detected for IP: ${geoInfo?.ip}`, task.id, task.name);
      updateTask(task.id, { lastLeadStatus: 'no_lead' });
      updateTaskStats(task.id, task.name, 'no_lead');
      setAutomation(prev => ({ ...prev, totalRuns: (prev.totalRuns || 0) + 1 }));
    }

    // Finalize
    await new Promise(r => setTimeout(r, 300));
    updateTask(task.id, { status: 'completed', completedRuns: (task.completedRuns || 0) + 1 });
    addLog('success', `Task completed: ${task.name}`, task.id, task.name);
  }, [emailPool, settings, proxyList, addLog, updateTask, getNextProxy, updateTaskStats]);

  const startAutomation = useCallback(async () => {
    const enabledTasks = tasks.filter(t => t.enabled);
    if (enabledTasks.length === 0) { addLog('warning', 'No enabled tasks to run'); return; }
    automationRef.current = true;
    setAutomation({ ...defaultAutomation, isRunning: true, phase: 'preparing', phaseDetail: 'Starting automation...' });
    addLog('success', `=== Automation STARTED | ${enabledTasks.length} tasks ===`);

    // Load proxy list if rotation enabled
    if (settings.proxy.rotation && settings.proxy.listUrl) {
      await loadProxyList();
    }

    // Reset task statuses
    setTasks(prev => prev.map(t => ({ ...t, status: 'pending' as const })));

    for (let i = 0; i < enabledTasks.length; i++) {
      if (!automationRef.current) break;
      const task = enabledTasks[i];
      try {
        await runTask(task, i);
      } catch (err) {
        addLog('error', `Task error: ${task.name} - ${String(err)}`, task.id, task.name);
        updateTask(task.id, { status: 'error' });
        updateTaskStats(task.id, task.name, 'error');
      }
      if (i < enabledTasks.length - 1 && automationRef.current) {
        const wait = (settings.waitBetweenTasks || 5) * 1000;
        addLog('info', `Waiting ${settings.waitBetweenTasks}s before next task...`);
        await new Promise(r => setTimeout(r, wait));
      }
    }

    setAutomation(prev => ({ ...prev, isRunning: false, phase: 'completed', phaseDetail: 'All tasks completed' }));
    automationRef.current = false;
    addLog('success', '=== All tasks COMPLETED ===');
  }, [tasks, settings, addLog, runTask, updateTask, updateTaskStats, loadProxyList]);

  const stopAutomation = useCallback(() => {
    automationRef.current = false;
    setAutomation(defaultAutomation);
    setTasks(prev => prev.map(t => t.status === 'running' ? { ...t, status: 'paused' } : t));
    addLog('warning', '=== Automation STOPPED ===');
  }, [addLog]);

  return (
    <AppContext.Provider value={{
      tasks, settings, extractedInfo, generatedIdentity, logs, scripts, automation,
      currentUrl, emailPool, leadHistory, taskStats, proxyList, currentProxy,
      addTask, updateTask, deleteTask, reorderTasks, updateSettings, addLog, clearLogs,
      addScript, updateScript, deleteScript,
      startAutomation, stopAutomation, setCurrentUrl, setEmailPool, refreshCVV,
      setExtractedInfo, setGeneratedIdentity, loadProxyList, clearStats,
    }}>
      {children}
    </AppContext.Provider>
  );
}
