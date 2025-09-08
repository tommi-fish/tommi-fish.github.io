document.addEventListener("DOMContentLoaded", () => {
  // Update copyright year
  document.getElementById("year").textContent = new Date().getFullYear()

  // Generate ASCII art
  generateAsciiArt()

  // Add terminal typing effect to bio
  const bioElement = document.querySelector(".bio")
  const bioText = bioElement.textContent
  bioElement.textContent = ""
  typeText(bioElement, bioText)

  // Add scan line effect
  addScanLineEffect()

  // Simulate terminal typing
  simulateTerminalTyping()
})

function generateAsciiArt() {
  const container = document.getElementById("ascii-container")

  // The exact fish ASCII art provided with added padding for vertical centering
  const fishArt = `






o
o      ______/~/~/~/__           /((
  o  // __            ====__    /_((
 o  //  @))       ))))      ===/__((
    ))           )))))))        __((
    \\\\     \\)     ))))    __===\\ _((
     \\\\_______________====      \\_((
                                 \\((






`

  // Set the ASCII art to the container with simplified styling
  container.innerHTML = fishArt
  container.style.fontSize = "14px"
  container.style.lineHeight = "1.2"
  container.style.fontFamily = "monospace"
  container.style.whiteSpace = "pre"
  container.style.color = "var(--text-color)"

  // Remove any background or border styling that might cause visual artifacts
  container.style.background = "transparent"
  container.style.border = "none"
}

// Function for typing effect
function typeText(element, text, index = 0, speed = 30) {
  if (index < text.length) {
    element.textContent += text.charAt(index)
    index++
    setTimeout(() => typeText(element, text, index, speed), speed)
  }
}

// Add scan line effect
function addScanLineEffect() {
  // Add random scan line
  const scanLine = document.createElement("div")
  scanLine.className = "scan-line"
  document.body.appendChild(scanLine)

  setInterval(() => {
    scanLine.style.top = `${Math.random() * 100}%`
    scanLine.style.opacity = "1"
    setTimeout(() => {
      scanLine.style.opacity = "0"
    }, 100)
  }, 3000)
}

// Simulate terminal typing
function simulateTerminalTyping() {
  const commands = ["ls -la", "cat about.txt", "cd projects", "git status", "npm start"]

  const terminalPrompt = document.querySelector(".terminal-prompt")
  const cursor = document.querySelector(".cursor")

  let currentCommand = ""
  let commandIndex = 0
  let charIndex = 0

  function typeCommand() {
    if (charIndex < commands[commandIndex].length) {
      currentCommand += commands[commandIndex][charIndex]
      const commandSpan = document.createElement("span")
      commandSpan.textContent = currentCommand

      // Remove previous command if exists
      const existingCommand = terminalPrompt.querySelector(".command")
      if (existingCommand) {
        terminalPrompt.removeChild(existingCommand)
      }

      commandSpan.className = "command"
      terminalPrompt.insertBefore(commandSpan, cursor)

      charIndex++
      setTimeout(typeCommand, Math.random() * 100 + 50)
    } else {
      // Command completed, wait and clear
      setTimeout(() => {
        const existingCommand = terminalPrompt.querySelector(".command")
        if (existingCommand) {
          terminalPrompt.removeChild(existingCommand)
        }

        currentCommand = ""
        charIndex = 0
        commandIndex = (commandIndex + 1) % commands.length

        setTimeout(typeCommand, 1000)
      }, 2000)
    }
  }

  // Start typing after a delay
  setTimeout(typeCommand, 1000)
}
