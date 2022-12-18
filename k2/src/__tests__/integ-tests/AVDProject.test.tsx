import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "./../../App";

import { setupServer } from "msw/node";
import { buildHandlers } from "./handlers";
import { ProjectProvider } from "./../../contexts/ProjContext";
import Projects from "./../../components/Projects";

const projectServer = setupServer(...buildHandlers());

beforeAll(() => projectServer.listen());
afterAll(() => projectServer.close());
describe("Projects", () => {
    it("Add view delete projects", async () => {
        render(
            <ProjectProvider>
                <App />
                <Projects />
            </ProjectProvider>
        );

        await userEvent.click(screen.getAllByText("Projects")[0]);
        expect(screen.getAllByText("Projects")[0]).toHaveTextContent("Projects");

        
        const projectDeleteButtons = await screen.findAllByTestId("projectDeleteButton");
        expect(projectDeleteButtons).toHaveLength(6);
        
        await userEvent.click(projectDeleteButtons[6]);

        // expect(items).toHaveLength(5);

        
    });
});
