[Setup]
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
PrivilegesRequired=admin
UsedUserAreasWarning=no
AppName=Calque
AppPublisherURL=https://unplug.red/
AppSupportURL=https://unplug.red/
AppUpdatesURL=https://unplug.red/
AppVerName=Calque
AppVersion=1.0
Compression=lzma2/ultra64
DefaultDirName={commonpf}\calque
DefaultGroupName=UnplugRed
DisableReadyPage=false
DisableWelcomePage=no
LanguageDetectionMethod=uilanguage
OutputBaseFilename=Calque Installer
SetupIconFile=resources\install.ico
ShowLanguageDialog=no
VersionInfoCompany=UnplugRed
VersionInfoProductName=Calque
VersionInfoProductVersion=1.0
VersionInfoVersion=1.0
WizardImageStretch=false
WizardImageFile=resources\install.bmp
WizardSmallImageFile=resources\smallinstall.bmp

[Files]
Source: "app\dist\*"; DestDir: {app}; Flags: recursesubdirs ignoreversion
[Icons]
Name: "{userdesktop}\Calque"; Filename: "{app}\Calque.exe"; Tasks: desktopicon
Name: "{group}\Calque"; Filename: "{group}\Calque.exe"
Name: "{group}\Uninstall Calque"; Filename: {uninstallexe}
[Tasks]
Name: "desktopicon"; Description: "Create a desktop icon"; GroupDescription: "Additional icons"; Flags: unchecked
[Run]
Filename: "{app}\Calque.exe"; Description: "Launch application"; Flags: nowait postinstall skipifsilent