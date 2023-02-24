import { Board } from "@customTypes/data";

export const demoData: { boards: Board[] } = {
  boards: [
    {
      id: 0,
      title: "Platform Launch",
      columns: [
        {
          id: 0,
          title: "Todo",
          color: "#DA1D1D",
          tasks: [
            {
              id: 0,
              title: "Build UI for onboarding flow",
              description: "",
              subtasks: [
                {
                  title: "Sign up page",
                  iscompleted: true,
                  id: 0,
                },
                {
                  title: "Sign in page",
                  iscompleted: false,
                  id: 1,
                },
                {
                  title: "Welcome page",
                  iscompleted: false,
                  id: 2,
                },
              ],
            },
            {
              id: 1,
              title: "Build UI for search",
              description: "",
              subtasks: [
                {
                  title: "Search page",
                  iscompleted: false,
                  id: 0,
                },
              ],
            },
            {
              id: 2,
              title: "Build settings UI",
              description: "",
              subtasks: [
                {
                  title: "Account page",
                  iscompleted: false,
                  id: 0,
                },
                {
                  title: "Billing page",
                  iscompleted: false,
                  id: 1,
                },
              ],
            },
            {
              id: 3,
              title: "QA and test all major user journeys",
              description:
                "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
              subtasks: [
                {
                  title: "Internal testing",
                  iscompleted: false,
                  id: 0,
                },
                {
                  title: "External testing",
                  iscompleted: false,
                  id: 1,
                },
              ],
            },
          ],
        },
        {
          id: 1,
          title: "Doing",
          color: "#DADA1D",
          tasks: [
            {
              id: 4,
              title: "Design settings and search pages",
              description: "",
              subtasks: [
                {
                  title: "Settings - Account page",
                  iscompleted: true,
                  id: 0,
                },
                {
                  title: "Settings - Billing page",
                  iscompleted: true,
                  id: 1,
                },
                {
                  title: "Search page",
                  iscompleted: false,
                  id: 2,
                },
              ],
            },
            {
              id: 5,
              title: "Add account management endpoints",
              description: "",
              subtasks: [
                {
                  title: "Upgrade plan",
                  iscompleted: true,
                  id: 0,
                },
                {
                  title: "Cancel plan",
                  iscompleted: true,
                  id: 1,
                },
                {
                  title: "Update payment method",
                  iscompleted: false,
                  id: 2,
                },
              ],
            },
            {
              id: 6,
              title: "Design onboarding flow",
              description: "",
              subtasks: [
                {
                  title: "Sign up page",
                  iscompleted: true,
                  id: 0,
                },
                {
                  title: "Sign in page",
                  iscompleted: false,
                  id: 1,
                },
                {
                  title: "Welcome page",
                  iscompleted: false,
                  id: 2,
                },
              ],
            },
            {
              id: 7,
              title: "Add search enpoints",
              description: "",
              subtasks: [
                {
                  title: "Add search endpoint",
                  iscompleted: true,
                  id: 0,
                },
                {
                  title: "Define search filters",
                  iscompleted: false,
                  id: 1,
                },
              ],
            },
            {
              id: 8,
              title: "Add authentication endpoints",
              description: "",
              subtasks: [
                {
                  title: "Define user model",
                  iscompleted: true,
                  id: 0,
                },
                {
                  title: "Add auth endpoints",
                  iscompleted: false,
                  id: 1,
                },
              ],
            },
            {
              id: 9,
              title:
                "Research pricing points of various competitors and trial different business models",
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              subtasks: [
                {
                  title: "Research competitor pricing and business models",
                  iscompleted: true,
                  id: 2,
                },
                {
                  title: "Outline a business model that works for our solution",
                  iscompleted: false,
                  id: 0,
                },
                {
                  title:
                    "Talk to potential customers about our proposed solution and ask for fair price expectancy",
                  iscompleted: false,
                  id: 1,
                },
              ],
            },
          ],
        },
        {
          id: 2,
          title: "Done",
          color: "#1BCC0F",
          tasks: [
            {
              id: 10,
              title: "Conduct 5 wireframe tests",
              description:
                "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
              subtasks: [
                {
                  title: "Complete 5 wireframe prototype tests",
                  iscompleted: true,
                  id: 0,
                },
              ],
            },
            {
              id: 11,
              title: "Create wireframe prototype",
              description:
                "Create a greyscale clickable wireframe prototype to test our asssumptions so far.",
              subtasks: [
                {
                  title: "Create clickable wireframe prototype in Balsamiq",
                  iscompleted: true,
                  id: 0,
                },
              ],
            },
            {
              id: 12,
              title: "Review results of usability tests and iterate",
              description:
                "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
              subtasks: [
                {
                  title:
                    "Meet to review notes from previous tests and plan changes",
                  iscompleted: true,
                  id: 0,
                },
                {
                  title: "Make changes to paper prototypes",
                  iscompleted: true,
                  id: 1,
                },
                {
                  title: "Conduct 5 usability tests",
                  iscompleted: true,
                  id: 2,
                },
              ],
            },
            {
              id: 13,
              title:
                "Create paper prototypes and conduct 10 usability tests with potential customers",
              description: "",
              subtasks: [
                {
                  title: "Create paper prototypes for version one",
                  iscompleted: true,
                  id: 0,
                },
                {
                  title: "Complete 10 usability tests",
                  iscompleted: true,
                  id: 1,
                },
              ],
            },
            {
              id: 13,
              title: "Market discovery",
              description:
                "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.",
              subtasks: [
                {
                  title: "Interview 10 prospective customers",
                  iscompleted: true,
                  id: 0,
                },
              ],
            },
            {
              id: 15,
              title: "Competitor analysis",
              description: "",
              subtasks: [
                {
                  title: "Find direct and indirect competitors",
                  iscompleted: true,
                  id: 0,
                },
                {
                  title: "SWOT analysis for each competitor",
                  iscompleted: true,
                  id: 1,
                },
              ],
            },
            {
              id: 16,
              title: "Research the market",
              description:
                "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
              subtasks: [
                {
                  title: "Write up research analysis",
                  iscompleted: true,
                  id: 0,
                },
                {
                  title: "Calculate TAM",
                  iscompleted: true,
                  id: 1,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
