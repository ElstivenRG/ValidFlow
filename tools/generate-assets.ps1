$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$assetDirectory = Join-Path $PSScriptRoot '../src/assets'
New-Item -ItemType Directory -Force -Path $assetDirectory | Out-Null

function New-Landscape([string]$name, [bool]$city) {
    $bitmap = New-Object System.Drawing.Bitmap 720, 480
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $brushes = New-Object 'System.Collections.Generic.List[System.Drawing.SolidBrush]'
    function Brush([string]$hex) {
        $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($hex))
        $brushes.Add($brush)
        return $brush
    }
    try {
        $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#DCEEE5'))
        $graphics.FillEllipse((Brush '#E9BE65'), 510, 60, 96, 96)
        if ($city) {
            $graphics.FillRectangle((Brush '#64B7B0'), 0, 300, 720, 180)
            $graphics.FillRectangle((Brush '#D5A367'), 50, 170, 180, 230)
            $graphics.FillRectangle((Brush '#D07A5A'), 250, 125, 180, 275)
            $graphics.FillRectangle((Brush '#E7C58D'), 450, 205, 210, 195)
            foreach ($x in @(85, 150, 280, 350, 490, 570)) {
                $graphics.FillRectangle((Brush '#174B42'), $x, 240, 36, 66)
            }
            $graphics.FillRectangle((Brush '#F3DCAE'), 0, 392, 720, 88)
        } else {
            $back = [System.Drawing.Point[]]@(
                [System.Drawing.Point]::new(0, 400), [System.Drawing.Point]::new(245, 80),
                [System.Drawing.Point]::new(470, 400))
            $front = [System.Drawing.Point[]]@(
                [System.Drawing.Point]::new(240, 480), [System.Drawing.Point]::new(490, 155),
                [System.Drawing.Point]::new(720, 480))
            $graphics.FillPolygon((Brush '#77BCA3'), $back)
            $graphics.FillPolygon((Brush '#246452'), $front)
            $graphics.FillEllipse((Brush '#174B42'), -170, 340, 760, 330)
            $graphics.FillEllipse((Brush '#0F766E'), 280, 395, 650, 220)
        }
        $bitmap.Save((Join-Path $assetDirectory $name), [System.Drawing.Imaging.ImageFormat]::Png)
    } finally {
        $graphics.Dispose()
        $bitmap.Dispose()
        foreach ($brush in $brushes) { $brush.Dispose() }
    }
}

New-Landscape 'mountains.png' $false
New-Landscape 'city.png' $true
