import { CKEditor } from "ckeditor4-react";
import { useContext } from "react";
import CommentTextContext from "../context/CommentTextContext";
import { useDarkMode } from "../../../Reviewer/context/DarkModeContext";

export default function WriteYourComment() {
  const { commentText, setCommentText } = useContext(CommentTextContext);
  const { isDarkMode } = useDarkMode();

  return (
    <div className="dark:bg-dark-card dark:text-white dark:border dark:border-dark-border bg-[#fff] py-[20px] px-[25px] rounded-[10px] flex flex-col flex-2 gap-[15px] h-full">
      <h1 className="text-sm font-semibold">Enter your Response</h1>

      {isDarkMode && (
        <style>{`
          .dark .cke_chrome { border-color: var(--color-dark-border) !important; background: var(--color-dark-card) !important; }
          .dark .cke_top, .dark .cke_bottom { background: var(--color-dark-card) !important; border-color: var(--color-dark-border) !important; }
          .dark .cke_toolgroup { background: var(--color-dark-highlight) !important; border-color: var(--color-dark-border) !important; }
          .dark .cke_button { background: transparent !important; }
          .dark .cke_button_icon { filter: invert(0.9) contrast(0.9); }
          .dark .cke_combo_button, .dark .cke_combo_text { background: var(--color-dark-highlight) !important; color: var(--color-white) !important; border-color: var(--color-dark-border) !important; }
          .dark .cke_panel { background: var(--color-dark-highlight) !important; color: var(--color-white) !important; }
          .dark .cke_resizer { border-color: var(--color-dark-border) !important; }
        `}</style>
      )}

      <div className="flex-1" style={{ minHeight: "400px" }}>
        <CKEditor
          editorUrl="https://cdn.ckeditor.com/4.22.1/standard/ckeditor.js"
          config={{
            contentsCss: isDarkMode
              ? [
                  "https://fonts.googleapis.com/css2?family=Public+Sans&display=swap",
                  "body { background: hsl(0, 0%, 10%); color: hsl(0, 0%, 95%); font-size: 13px !important; padding-left: 10px; font-family: 'Public Sans'; } a{ color: hsl(0, 0%, 95%); } hr{ border-color: hsl(0, 0%, 20%); } pre, code{ background: hsl(0, 0%, 17%); color: hsl(0, 0%, 95%); }"
                ]
              : [
                  "https://fonts.googleapis.com/css2?family=Public+Sans&display=swap",
                  "body { font-size: 13px !important; padding-left: 10px; font-family: 'Public Sans'; color: hsl(0, 0%, 24%);}"
                ],
            uiColor: isDarkMode ? "hsl(0, 0%, 10%)" : "#ffffff",
            versionCheck: false,
            resize_enabled: false,
            height: "350px",
            autoGrow_minHeight: 350,
            autoGrow_maxHeight: 800,
            autoGrow_bottomSpace: 50,
          }}
          initData="<p>Write your response here!</p>"
          onChange={({ editor }) => {
            setCommentText(editor.getData());
          }}
        />
      </div>
    </div>
  );
}
