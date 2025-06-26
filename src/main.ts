import { MarkdownView, Plugin, TFile } from "obsidian";
import { DoneAtSettingTab } from "./settings.ts";

interface DoneAtSettings {
	timeFormat: string;
	dateFormat: string;
	includeDate: boolean;
	taskTag: string;
}

const DEFAULT_SETTINGS: DoneAtSettings = {
	timeFormat: "HH:mm",
	dateFormat: "YYYY-MM-DD",
	includeDate: true,
	taskTag: "#task",
};

export default class DoneAtPlugin extends Plugin {
	settings: DoneAtSettings;

	async onload() {
		await this.loadSettings();

		// Add settings tab
		this.addSettingTab(new DoneAtSettingTab(this.app, this));

		// Register the event handler for editor changes
		this.registerEvent(
			this.app.workspace.on("editor-change", (editor, view) => {
				if (view instanceof MarkdownView) {
					this.handleEditorChange(editor, view);
				}
			}),
		);

		console.log("Done at plugin loaded");
	}

	onunload() {
		console.log("Done at plugin unloaded");
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData(),
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	handleEditorChange(editor: any, view: MarkdownView) {
		const cursor = editor.getCursor();
		const line = editor.getLine(cursor.line);

		// Check if this line is a task line with our tag
		if (this.isTaskLine(line) && this.hasTaskTag(line)) {
			if (this.isCheckedTask(line)) {
				// Task was checked - add timestamp if not already present
				if (!this.hasTimestamp(line)) {
					const timestamp = this.generateTimestamp();
					const newLine = this.addTimestampToLine(line, timestamp);
					editor.setLine(cursor.line, newLine);
				}
			} else if (this.isUncheckedTask(line)) {
				// Task was unchecked - remove timestamp if present
				if (this.hasTimestamp(line)) {
					const newLine = this.removeTimestampFromLine(line);
					editor.setLine(cursor.line, newLine);
				}
			}
		}
	}

	isTaskLine(line: string): boolean {
		// Check if line contains a checkbox pattern
		return /^(\s*)([-*+]|\d+\.)\s*\[.\]\s*/.test(line);
	}

	isCheckedTask(line: string): boolean {
		// Check if the checkbox is marked as done [x] or [X]
		return /\[[xX]\]/.test(line);
	}

	hasTaskTag(line: string): boolean {
		// Check if line contains the configured task tag
		return line.includes(this.settings.taskTag);
	}

	isUncheckedTask(line: string): boolean {
		// Check if the checkbox is unchecked [ ]
		return /\[\s\]/.test(line);
	}

	hasTimestamp(line: string): boolean {
		// Check if line already has a timestamp
		// Look for patterns like "✅ 2024-06-26 14:30" or "⏰ 14:30"
		return /[✅⏰]\s*\d{4}-\d{2}-\d{2}\s*\d{2}:\d{2}/.test(line) ||
			/[✅⏰]\s*\d{2}:\d{2}/.test(line);
	}

	generateTimestamp(): string {
		const now = new Date();
		const timeStr = this.formatTime(now);

		if (this.settings.includeDate) {
			const dateStr = this.formatDate(now);
			return `✅ ${dateStr} ${timeStr}`;
		} else {
			return `✅ ${timeStr}`;
		}
	}

	formatTime(date: Date): string {
		// Format time according to settings (default: HH:mm)
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		return `${hours}:${minutes}`;
	}

	formatDate(date: Date): string {
		// Format date according to settings (default: YYYY-MM-DD)
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	addTimestampToLine(line: string, timestamp: string): string {
		// Add timestamp at the end of the line, before any trailing whitespace
		const trimmedLine = line.trimEnd();
		return `${trimmedLine} ${timestamp}`;
	}

	removeTimestampFromLine(line: string): string {
		// Remove timestamp from the line
		// Remove patterns like "✅ 2024-06-26 14:30" or "⏰ 14:30"
		let cleanedLine = line.replace(
			/\s*[✅⏰]\s*\d{4}-\d{2}-\d{2}\s*\d{2}:\d{2}\s*$/,
			"",
		);
		cleanedLine = cleanedLine.replace(/\s*[✅⏰]\s*\d{2}:\d{2}\s*$/, "");
		return cleanedLine.trimEnd();
	}
}
