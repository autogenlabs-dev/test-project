package com.example.simple_agent_android.utils

import android.content.Context
import android.content.SharedPreferences

object SharedPrefsUtils {
    private const val OVERLAY_PREFS = "overlay_prefs"
    private const val AGENT_PREFS = "agent_prefs"
    private const val ONBOARDING_PREFS = "onboarding_prefs"
    private const val VERTICAL_OFFSET_KEY = "vertical_offset"
    private const val LLM_API_KEY = "openai_key" // Keeping key name for migration compatibility
    private const val LLM_BASE_URL_KEY = "llm_base_url"
    private const val LLM_MODEL_NAME_KEY = "llm_model_name"
    private const val ONBOARDING_COMPLETED_KEY = "onboarding_completed"
    private const val COMPLETION_SCREEN_ENABLED_KEY = "completion_screen_enabled"

    // Default values
    private const val DEFAULT_BASE_URL = "https://api.openai.com/v1/chat/completions"
    private const val DEFAULT_MODEL = "gpt-4o"

    fun getVerticalOffset(context: Context): Int {
        return getSharedPrefs(context, OVERLAY_PREFS)
            .getInt(VERTICAL_OFFSET_KEY, 0)
    }

    fun setVerticalOffset(context: Context, offset: Int) {
        getSharedPrefs(context, OVERLAY_PREFS)
            .edit()
            .putInt(VERTICAL_OFFSET_KEY, offset)
            .apply()
    }

    fun getApiKey(context: Context): String {
        return getSharedPrefs(context, AGENT_PREFS)
            .getString(LLM_API_KEY, "") ?: ""
    }

    // Deprecated: Use getApiKey
    fun getOpenAIKey(context: Context): String = getApiKey(context)

    fun setApiKey(context: Context, key: String) {
        getSharedPrefs(context, AGENT_PREFS)
            .edit()
            .putString(LLM_API_KEY, key)
            .apply()
    }

    // Deprecated: Use setApiKey
    fun setOpenAIKey(context: Context, key: String) = setApiKey(context, key)

    fun getBaseUrl(context: Context): String {
        return getSharedPrefs(context, AGENT_PREFS)
            .getString(LLM_BASE_URL_KEY, DEFAULT_BASE_URL) ?: DEFAULT_BASE_URL
    }

    fun setBaseUrl(context: Context, url: String) {
        getSharedPrefs(context, AGENT_PREFS)
            .edit()
            .putString(LLM_BASE_URL_KEY, url)
            .apply()
    }

    fun getModelName(context: Context): String {
        return getSharedPrefs(context, AGENT_PREFS)
            .getString(LLM_MODEL_NAME_KEY, DEFAULT_MODEL) ?: DEFAULT_MODEL
    }

    fun setModelName(context: Context, model: String) {
        getSharedPrefs(context, AGENT_PREFS)
            .edit()
            .putString(LLM_MODEL_NAME_KEY, model)
            .apply()
    }

    fun hasCompletedOnboarding(context: Context): Boolean {
        return getSharedPrefs(context, ONBOARDING_PREFS)
            .getBoolean(ONBOARDING_COMPLETED_KEY, false)
    }

    fun setOnboardingCompleted(context: Context, completed: Boolean) {
        getSharedPrefs(context, ONBOARDING_PREFS)
            .edit()
            .putBoolean(ONBOARDING_COMPLETED_KEY, completed)
            .apply()
    }

    fun isCompletionScreenEnabled(context: Context): Boolean {
        return getSharedPrefs(context, AGENT_PREFS)
            .getBoolean(COMPLETION_SCREEN_ENABLED_KEY, true) // Default to enabled
    }

    fun setCompletionScreenEnabled(context: Context, enabled: Boolean) {
        getSharedPrefs(context, AGENT_PREFS)
            .edit()
            .putBoolean(COMPLETION_SCREEN_ENABLED_KEY, enabled)
            .apply()
    }

    private fun getSharedPrefs(context: Context, prefsName: String): SharedPreferences {
        return context.getSharedPreferences(prefsName, Context.MODE_PRIVATE)
    }
}
