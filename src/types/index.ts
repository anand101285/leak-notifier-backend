/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

export enum WazuhIndices {
    AlertIndex = 'wazuh-alerts-*',
    VulnIndex = 'wazuh-states-vulnerabilities-*',
    MinesIndex = 'sarab-mines'
}
export enum Environment {
    Production = 'production',
    Development = 'development',
    Testing = 'testing'
}

export enum HoneypotType {
    Interactive = 'interactive',
    NonInteractive = 'non-interactive'
}

export enum MachineTagType {
    Original = 'original',
    Clone = 'clone',
    Template = 'template',
    Multiple = 'multi',
    ADOriginalChild = 'ad.child.original',
    ADCloneChild = 'ad.child.clone',
    ADChild = 'ad.child'
}
export const enum SocketNamespace {
    Default = '/',
    Frontend = '/frontend',
    MinesAgent = '/mines-agent'
}

export enum UserRole {
    Client = 'client',
    Admin = 'admin'
}

export enum RedisKeys {
    HoneypotExecutionQueue = 'HoneypotExecutionQueue',
    PendingQueue = 'PendingQueue'
}

export interface AxiosResponseData {
    data: unknown;
}

export enum HoneypotServiceStatus {
    Running = 'running',
    Exited = 'exited',
    Failed = 'failed',
    Removed = 'removed',
    Pending = 'pending'
}

export enum TimeFrameRRD {
    Hour = 'hour',
    Day = 'day',
    Week = 'week',
    Month = 'month',
    Year = 'year'
}

export enum ProxmoxMachineTypes {
    LXC = 'lxc',
    QEMU = 'qemu'
}

export enum MachineStatusChange {
    Resume = 'resume',
    Start = 'start',
    Stop = 'stop',
    Suspend = 'suspend',
    Reboot = 'reboot'
}

export enum ProxmoxMachineStatus {
    Stopped = 'stopped',
    Running = 'running'
}

export enum ProxmoxTaskStatus {
    Running = 'running'
}

export enum ImageDownloadStatus {
    Completed = 'completed',
    Failed = 'failed',
    Pending = 'pending'
}

export enum FileUploadStatus {
    Completed = 'completed',
    Failed = 'failed',
    Pending = 'pending'
}

export enum FrontendRoutes {
    Dashboard = '/user',
    ThreatMap = '/user/threatMapping',
    DecoyManage = '/user/decoy/manage',
    Snapshots = '/user/decoy/manage/snapshots/',
    DecoyGroups = '/user/decoy/decoy-group'
}

export enum NodeLogType {
    System = 'system',
    Firewall = 'firewall'
}

export enum LogFileFormats {
    Csv = 'csv',
    Json = 'json'
}

export enum AD {
    CONFIG_PATH = 'C:\\Users\\Administrator\\Desktop\\AD\\config.txt',
    CMD_PATH = 'C:\\Windows\\System32\\cmd.exe',
    POWERSHELL_PATH = 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe',
    SCRIPT_DIR = 'C:\\AD_Automation.ps1',
    FOREST_SCRIPT = 'C:\\cleanup.ps1',
    DEFAULT_SHARE_FOLDER = 'C:\\SharedFolders'
}

export enum AD_BASE_DEFAULT {
    Administrator = 'Administrator'
}

export enum ADUserAccessType {
    User = 'user',
    Admin = 'admin'
}

export enum Platforms {
    Windows = 'windows',
    Linux = 'linux',
    ActiveDirectory = 'activeDirectory'
}

export enum AptGroupSources {
    Mitre = 'mitre-attack',
    Custom = 'custom',
    BreachPlus = 'breach+'
}
export enum ShareFolderAccessAD {
    Read = 'read',
    Full = 'full'
}

export enum Notifications {
    Info = 'info',
    Alerts = 'alerts',
    Honeypots = 'honeypots'
}

export enum TokenType {
    WordDoc = 'word-doc',
    MSWord = 'ms-word',
    MSExcel = 'ms-excel',
    Folder = 'folder',
    CommandMonitor = 'command-monitor',
    KubeConfig = 'kubeconfig',
    ElasticSearchConfig = 'es-config',
    DeceptionDiverting = 'deception-diverting',
    SCR = 'screen-saver',
    EXE = 'executable',
    BAT = 'batch',
    URL = 'url',
    PS1 = 'powershell',
    CMD = 'cmd',
    VBS = 'visual-basic-application',
    VBE = 'visual-basic-script',
    HTA = 'html-application',
    SH = 'bash-script'
}

export enum InjectionBrowsers {
    chrome = 'chrome',
    yandex = 'yandex',
    vivaldi = 'vivaldi',
    ucozmedia = 'uran',
    torch = 'torch',
    sputnik = 'sputnik',
    qipsurf = 'surf',
    orbitum = 'orbitum',
    opera = 'opera',
    maplestudio = 'maplestudio',
    lieBao = 'liebao',
    kometa = 'kometa',
    iridium = 'iridium',
    fenrir = 'fenrir inc',
    epic = 'epic privacy',
    elements = 'elements',
    comodo = 'Comodo',
    coccoc = 'coccoc',
    chromium = 'chromium',
    chedot = 'chedot',
    cent = 'centbrowser',
    catalina = 'citrio',
    brave = 'brave',
    amigo = 'amigo',
    chrome360 = '360Chrome',
    star7 = '7star',
    edge = 'edge'
}

export const BrowserInjectonPath = {
    [InjectionBrowsers.chrome360]: '\\AppData\\Local\\360Chrome\\Chrome\\User Data',
    [InjectionBrowsers.star7]: '\\AppData\\Local\\7Star\\7Star\\User Data',
    [InjectionBrowsers.amigo]: '\\AppData\\Local\\Amigo\\User Data',
    [InjectionBrowsers.brave]: '\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data',
    [InjectionBrowsers.catalina]: '\\AppData\\Local\\CatalinaGroup\\Citrio\\User Data',
    [InjectionBrowsers.cent]: '\\AppData\\Local\\CentBrowser\\User Data',
    [InjectionBrowsers.chedot]: '\\AppData\\Local\\Chedot\\User Data',
    [InjectionBrowsers.chrome]: '\\AppData\\Local\\Google\\Chrome\\User Data',
    [InjectionBrowsers.chromium]: '\\AppData\\Local\\Chromium\\User Data',
    [InjectionBrowsers.coccoc]: '\\AppData\\Local\\CocCoc\\Browser\\User Data',
    [InjectionBrowsers.comodo]: '\\AppData\\Local\\Comodo\\Dragon\\User Data',
    [InjectionBrowsers.elements]: '\\AppData\\Local\\Elements Browser\\User Data',
    [InjectionBrowsers.epic]: '\\AppData\\Local\\Epic Privacy Browser\\User Data',
    [InjectionBrowsers.fenrir]: '\\AppData\\Local\\Fenrir Inc\\Sleipnir5\\setting\\modules',
    [InjectionBrowsers.iridium]: '\\AppData\\Local\\Iridium\\User Data',
    [InjectionBrowsers.kometa]: '\\AppData\\Local\\Kometa\\User Data',
    [InjectionBrowsers.lieBao]: '\\AppData\\Local\\liebao\\User Data',
    [InjectionBrowsers.maplestudio]: '\\AppData\\Local\\MapleStudio\\ChromePlus\\User Data',
    [InjectionBrowsers.opera]: '\\AppData\\Roaming\\Opera Software\\Opera Stable',
    [InjectionBrowsers.orbitum]: '\\AppData\\Local\\Orbitum\\User Data',
    [InjectionBrowsers.qipsurf]: '\\AppData\\Local\\QIP Surf\\User Data',
    [InjectionBrowsers.sputnik]: '\\AppData\\Local\\Sputnik\\Sputnik\\User Data',
    [InjectionBrowsers.torch]: '\\AppData\\Local\\Torch\\User Data',
    [InjectionBrowsers.ucozmedia]: '\\AppData\\Local\\uCozMedia\\Uran\\User Data',
    [InjectionBrowsers.vivaldi]: '\\AppData\\Local\\Vivaldi\\User Data',
    [InjectionBrowsers.yandex]: '\\AppData\\Local\\Yandex\\YandexBrowser\\User Data',
    [InjectionBrowsers.edge]: '\\AppData\\Local\\Microsoft\\Edge\\User Data'
};

export enum Honeypots {
    Camera = 'hp.camera',
    Printer = 'hp.printer',
    Gaspot = 'hp.gaspot',
    Sensor = 'hp.sensor',
    Log4Shell = 'hp.log4shell',
    Wapot = 'hp.wapot',
    Web = 'hp.web',
    ElasticSearch = 'hp.elasticsearch'
}

export enum TestCaseType {
    Any = 'any',
    Command = 'command'
}

export enum ADAssigne {
    Default = 'default',
    Client = 'client'
}

export enum AgentQueryActions {
    Install = 'install',
    Remove = 'remove',
    Update = 'update',
    AddDomain = 'domain',
    Status = 'status',
    Mines = 'mines'
}

export enum AgentQueryMode {
    Join = 'Join',
    Remove = 'Remove'
}

export enum MinesLogType {
    Sacl = 'sacl',
    Event = 'event'
}

export enum RulesSeverity {
    Critical = 'critical',
    High = 'high',
    Medium = 'medium',
    Info = 'info'
}

export enum FakeResponseFormat {
    Alert = 'alert',
    Block = 'block'
}

export enum FakeResponseAddedBy {
    User = 'user',
    System = 'system'
}
