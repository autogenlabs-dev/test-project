package com.example.simple_agent_android.agentcore

import android.content.Context
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import com.example.simple_agent_android.utils.NotificationUtils
import com.example.simple_agent_android.utils.TTSManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

object AgentStateManager {
    private val _agentRunning = mutableStateOf(false)
    val agentRunning: State<Boolean> = _agentRunning

    private val _agentRunningFlow = MutableStateFlow(false)
    val agentRunningFlow: StateFlow<Boolean> = _agentRunningFlow.asStateFlow()

    private var context: Context? = null
    private var ttsManager: TTSManager? = null

    fun initialize(appContext: Context) {
        context = appContext.applicationContext
        ttsManager = TTSManager(appContext)
    }

    fun isAgentRunning(): Boolean = _agentRunning.value

    fun startAgent(instruction: String, apiKey: String, appContext: Context, onOutput: ((String) -> Unit)? = null) {
        if (_agentRunning.value) {
            // Agent is already running, don't start again
            return
        }

        context = appContext.applicationContext
        // Ensure TTS is initialized
        if (ttsManager == null) {
            ttsManager = TTSManager(appContext)
        }

        _agentRunning.value = true
        _agentRunningFlow.value = true
        NotificationUtils.showAgentStartedNotification(appContext)

        AgentOrchestrator.runAgent(
            instruction = instruction,
            apiKey = apiKey,
            context = appContext,
            onAgentStopped = {
                stopAgent()
            },
            onOutput = { output ->
                onOutput?.invoke(output)
                // Speak the output if it's not a debug log (simple heuristic: starts with emoji or known prefix)
                // You might want to refine what gets spoken
                if (shouldSpeak(output)) {
                    ttsManager?.speak(cleanTextForSpeech(output))
                }
            }
        )
    }

    private fun shouldSpeak(text: String): Boolean {
        // Speak everything that is user-facing.
        // In AgentOrchestrator, onOutput is usually called with user-friendly messages.
        // We might filter out some debug logs if they leak there.
        return true
    }

    private fun cleanTextForSpeech(text: String): String {
        // Remove emojis for cleaner speech if needed, or just pass through
        return text
    }

    fun stopAgent() {
        if (!_agentRunning.value) {
            // Agent is already stopped
            return
        }

        AgentOrchestrator.stopAgent()
        _agentRunning.value = false
        _agentRunningFlow.value = false
        context?.let { NotificationUtils.showAgentStoppedNotification(it) }
    }

    fun pauseAgent() {
        AgentOrchestrator.pauseAgent()
    }

    fun resumeAgent() {
        AgentOrchestrator.resumeAgent()
    }

    fun isPaused(): Boolean = AgentOrchestrator.isPaused()

    fun shutdown() {
        ttsManager?.shutdown()
    }
}
