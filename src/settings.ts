import { App, PluginSettingTab, Setting } from "obsidian";
import DoneAtPlugin from "./main.ts";

export class DoneAtSettingTab extends PluginSettingTab {
	plugin: DoneAtPlugin;

	constructor(app: App, plugin: DoneAtPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "Done at Settings" });

		new Setting(containerEl)
			.setName("Task tag")
			.setDesc("The tag that identifies tasks to track (e.g., #task)")
			.addText((text) =>
				text
					.setPlaceholder("#task")
					.setValue(this.plugin.settings.taskTag)
					.onChange(async (value) => {
						this.plugin.settings.taskTag = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Include date")
			.setDesc("Include the date along with the time in timestamps")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.includeDate)
					.onChange(async (value) => {
						this.plugin.settings.includeDate = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Time format")
			.setDesc(
				"Format for the time (HH:mm for 24-hour, hh:mm A for 12-hour)",
			)
			.addText((text) =>
				text
					.setPlaceholder("HH:mm")
					.setValue(this.plugin.settings.timeFormat)
					.onChange(async (value) => {
						this.plugin.settings.timeFormat = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Date format")
			.setDesc("Format for the date (YYYY-MM-DD, MM/DD/YYYY, etc.)")
			.addText((text) =>
				text
					.setPlaceholder("YYYY-MM-DD")
					.setValue(this.plugin.settings.dateFormat)
					.onChange(async (value) => {
						this.plugin.settings.dateFormat = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
