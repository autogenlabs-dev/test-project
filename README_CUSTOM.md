# Tetra (Simple Agent Android) - Custom Edition

This is a customized version of the **Tetra** Android Agent, enhanced to support:
1.  **Any OpenAI-Compatible LLM** (e.g., Groq, GLM-4, LocalAI).
2.  **Microsoft Edge TTS** (via Android System Text-to-Speech).

## 🚀 Features

*   **Full Phone Control:** Uses Android Accessibility Services to tap, swipe, and type for you.
*   **Voice Assistant:** Talk to your phone to give commands.
*   **Custom AI Brain:** Connect to ultra-fast models like Groq or GLM-4.
*   **Floating Overlay:** Access the agent from any screen.

## 🛠️ Build & Install

### Prerequisites
*   Android Studio (Ladybug or newer recommended)
*   Android SDK 35
*   JDK 17 or higher

### Steps
1.  Open the `Tetra` folder in Android Studio.
2.  Wait for Gradle sync to complete.
3.  Connect your Android device (Developer Options & USB Debugging must be ON).
4.  Click **Run > Run 'app'**.

Alternatively, build the APK from the command line:
```bash
cd Tetra
./gradlew assembleDebug
```
The APK will be located at: `Tetra/app/build/outputs/apk/debug/app-debug.apk`

## ⚙️ Configuration

### 1. Enable Accessibility Service (Crucial)
When you first open the app, tap **"Enable Accessibility Service"**. This will take you to Android Settings. Find **"Simple Agent Android"** (or Tetra) and toggle it **ON**.

### 2. Configure AI (Groq / GLM)
1.  Open the **Menu (☰)** and go to **Settings**.
2.  **API Key:** Enter your Groq or GLM API Key.
3.  **Base URL:**
    *   For **Groq**: `https://api.groq.com/openai/v1/chat/completions`
    *   For **GLM-4**: Enter the GLM API endpoint (check their docs).
4.  **Model Name:**
    *   For **Groq**: `llama3-70b-8192` (or similar)
    *   For **GLM**: `glm-4`
5.  Tap **Save Configuration**.

### 3. Setup Microsoft Edge TTS (Voice)
To make the agent sound like Microsoft Edge:
1.  Install the **Microsoft Edge** browser or a dedicated "Microsoft TTS" app from the Play Store.
2.  Go to **Android Settings > System > Languages & input > Text-to-speech output**.
3.  Tap **Preferred engine**.
4.  Select **Microsoft** (or Edge).
5.  (Optional) Tap the gear icon next to it to choose a specific voice (e.g., "Guy" or "Aria").

Now, when the agent speaks, it will use the high-quality Edge voice!

## 🗣️ Usage
1.  Tap the **Microphone** icon (in the app or floating bubble).
2.  Say a command:
    *   *"Open YouTube and search for funny cats"*
    *   *"Check my unread emails"*
    *   *"Send a WhatsApp message to Mom saying I'll be late"*
3.  Watch the agent work! You can say "Stop" at any time.

## 🛑 Troubleshooting
*   **Agent not moving?** Ensure Accessibility Service is enabled. Sometimes Android disables it for battery saving.
*   **No Voice?** Check your volume and ensure a valid TTS engine is selected in system settings.
*   **AI Error?** Check your API Key and Base URL in Settings. Ensure you have internet access.
