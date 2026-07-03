# auto_push.ps1
# Automatically commits and pushes all changes to GitHub.
# Designed to be run by Windows Task Scheduler every 24 hours.

$projectPath = "c:\Users\gveda\OneDrive\Documents\Full Stack Gemini API Project"
$logFile     = "$projectPath\auto_push.log"
$timestamp   = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

Set-Location $projectPath

# Stage all changes
git add -A

# Check if there is anything to commit
$status = git status --porcelain
if (-not $status) {
    Add-Content $logFile "[$timestamp] No changes to commit. Skipping push."
    exit 0
}

# Commit with a timestamped message
git commit -m "Auto-commit: $timestamp"

# Push to remote
git push origin main 2>&1 | Tee-Object -Append $logFile

Add-Content $logFile "[$timestamp] Push completed successfully."
