import { Board } from "@customTypes/data";

/**
 * Demo data: Structured like a mid-project kanban board
 * of someone building this task-manager app.
 */
export const demoData: { boards: Board[] } = {
  boards: [
    {
      id: 0,
      title: "Task Manager Project",
      columns: [
        {
          id: 0,
          title: "Backlog",
          color: "#6B7280",
          tasks: [
            {
              id: 0,
              title: "Add keyboard shortcuts",
              description:
                "Shortcut support for board/task navigation and quick actions.",
              subtasks: [
                { title: "Design shortcut list", iscompleted: false, id: 0 },
                { title: "Cmd+K global search", iscompleted: false, id: 1 },
                { title: "Escape to close modal", iscompleted: false, id: 2 },
              ],
            },
            {
              id: 1,
              title: "Export board as JSON",
              description: "Export feature for backup and portability.",
              subtasks: [
                { title: "Write export API/helper", iscompleted: false, id: 0 },
                { title: "Add download button", iscompleted: false, id: 1 },
                { title: "Consider import flow (reverse)", iscompleted: false, id: 2 },
              ],
            },
            {
              id: 2,
              title: "Board templates",
              description: "Pre-made template option when creating a new board.",
              subtasks: [
                { title: "Define template data structure", iscompleted: false, id: 0 },
                { title: "2-3 sample templates (Agile, Simple, Personal)", iscompleted: false, id: 1 },
              ],
            },
          ],
        },
        {
          id: 1,
          title: "To Do",
          color: "#F59E0B",
          tasks: [
            {
              id: 3,
              title: "Task detail modal redesign",
              description: "Subtask progress bar and clearer layout.",
              subtasks: [
                { title: "Wireframe in Figma", iscompleted: false, id: 0 },
                { title: "Subtask progress bar component", iscompleted: false, id: 1 },
                { title: "Full-screen modal on mobile", iscompleted: false, id: 2 },
              ],
            },
            {
              id: 4,
              title: "Column color picker",
              description: "User-defined color per column.",
              subtasks: [
                { title: "Color picker UI (sidebar/modal)", iscompleted: false, id: 0 },
                { title: "Wire color value to Column type", iscompleted: false, id: 1 },
                { title: "Default palette (6-8 colors)", iscompleted: false, id: 2 },
              ],
            },
            {
              id: 5,
              title: "Empty state illustrations",
              description: "Meaningful visuals and CTA when board/column is empty.",
              subtasks: [
                { title: "Empty board state", iscompleted: false, id: 0 },
                { title: "Empty column state", iscompleted: false, id: 1 },
              ],
            },
          ],
        },
        {
          id: 2,
          title: "In Progress",
          color: "#3B82F6",
          tasks: [
            {
              id: 6,
              title: "Fix drag-and-drop on mobile",
              description: "Drag-drop sometimes doesn't trigger on touch events.",
              subtasks: [
                { title: "Review react-beautiful-dnd docs", iscompleted: true, id: 0 },
                { title: "Test touch handlers", iscompleted: true, id: 1 },
                { title: "Fallback: long-press + move", iscompleted: false, id: 2 },
              ],
            },
            {
              id: 7,
              title: "Theme persistence bug",
              description: "Theme sometimes resets on page reload.",
              subtasks: [
                { title: "Check next-themes + persist behaviour", iscompleted: true, id: 0 },
                { title: "Prevent flash on SSR", iscompleted: false, id: 1 },
              ],
            },
            {
              id: 8,
              title: "New task creation validation",
              description: "Prevent empty title and unnecessary field submission.",
              subtasks: [
                { title: "Form validation (title required)", iscompleted: true, id: 0 },
                { title: "Error messages and disabled submit", iscompleted: false, id: 1 },
              ],
            },
          ],
        },
        {
          id: 3,
          title: "Done",
          color: "#10B981",
          tasks: [
            {
              id: 9,
              title: "Board CRUD (create / edit / delete)",
              description: "Add board, rename, and delete flows.",
              subtasks: [
                { title: "Board modal (create/edit)", iscompleted: true, id: 0 },
                { title: "Delete confirmation modal", iscompleted: true, id: 1 },
                { title: "setBoards integration in store", iscompleted: true, id: 2 },
              ],
            },
            {
              id: 10,
              title: "Fix hydration errors",
              description: "Resolved SSR vs client HTML mismatch.",
              subtasks: [
                { title: "Theme/logo render after mount", iscompleted: true, id: 0 },
                { title: "ClientOnly wrapper for store data", iscompleted: true, id: 1 },
                { title: "Header title and button text", iscompleted: true, id: 2 },
              ],
            },
            {
              id: 11,
              title: "Sidebar collapse + mobile overlay",
              description: "Toggle on desktop, overlay to close on mobile.",
              subtasks: [
                { title: "showSidebar state and toggle", iscompleted: true, id: 0 },
                { title: "Mobile overlay (tap to close)", iscompleted: true, id: 1 },
                { title: "Class transitions by breakpoint", iscompleted: true, id: 2 },
              ],
            },
            {
              id: 12,
              title: "Basic task create modal",
              description: "Task add form and store persistence.",
              subtasks: [
                { title: "Modal UI and form fields", iscompleted: true, id: 0 },
                { title: "Subtask add/remove", iscompleted: true, id: 1 },
                { title: "Add task to selected column", iscompleted: true, id: 2 },
              ],
            },
          ],
        },
      ],
    },
  ],
};
