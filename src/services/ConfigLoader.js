import Config from "@/model/Config";

let globalConfig = null;

export async function loadConfig() {
  try {
    const response = await fetch("/config.json");
    const configData = await response.json();
    globalConfig = new Config(configData.repository, configData.commits);
    return globalConfig;
  } catch (error) {
    console.error("Error loading config:", error);
  }
}
