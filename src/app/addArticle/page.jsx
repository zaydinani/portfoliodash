"use client";
import { useState } from "react";
//import FroalaEditorComponent from "react-froala-wysiwyg";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import "../../styles/addArticle.scss";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/js/plugins/code_beautifier.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/quote.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/table.min.js";
import "froala-editor/js/plugins/video.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/js/plugins/special_characters.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/fullscreen.min.js";
import "froala-editor/js/plugins/draggable.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/url.min.js";
import "froala-editor/js/plugins/quick_insert.min.js";

function AddArticle() {
  const router = useRouter();
  const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
    loading: () => <p>Loading...</p>,
    ssr: false, // Ensure the component is only rendered on the client-side
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [articleBannerImage, setArticleBannerImage] = useState(null); // State to store the selected image

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleModelChange = (model) => {
    setContent(model);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", articleBannerImage);
      formData.append("content", content);

      const res = await fetch("/api/articles", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to save article");
      }

      router.push("/articles");
    } catch (error) {
      console.error(error);
      alert("Error saving article");
    }
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    setArticleBannerImage(file); // Store the entire file object
  };

  return (
    <main className="skill_container">
      <h1>Add New Article</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Article Title:</label>
        <input
          type="text"
          className="input"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="articleBannerImage">Article Banner Image:</label>
        <input
          type="file"
          id="articleBannerImage"
          className="imageInput"
          accept="image/*"
          onChange={handleBannerImageChange}
        />
        <FroalaEditorComponent
          className="fixed-width-editor"
          model={content}
          onModelChange={handleModelChange}
          config={{
            placeholderText: "Start writing your article...",
            toolbarButtons: [
              "bold",
              "italic",
              "underline",
              "strikeThrough",
              "subscript",
              "superscript",
              "|",
              "fontFamily",
              "fontSize",
              "color",
              "inlineStyle",
              "paragraphStyle",
              "|",
              "paragraphFormat",
              "align",
              "formatOL",
              "formatUL",
              "outdent",
              "indent",
              "|",
              "quote",
              "insertHR",
              "-",
              "insertLink",
              "insertImage",
              "insertVideo",
              "embedly",
              "insertFile",
              "insertTable",
              "|",
              "emoticons",
              "specialCharacters",
              "insertHTML",
              "insertCode",
              "|",
              "undo",
              "redo",
              "clearFormatting",
              "selectAll",
              "html",
            ],
            pluginsEnabled: [
              "align",
              "charCounter",
              "codeBeautifier",
              "codeView",
              "colors",
              "draggable",
              "embedly",
              "emoticons",
              "fontFamily",
              "fontSize",
              "fullscreen",
              "image",
              "inlineStyle",
              "link",
              "lists",
              "paragraphFormat",
              "paragraphStyle",
              "quickInsert",
              "quote",
              "specialCharacters",
              "table",
              "url",
              "video",
            ],
            imageUpload: true,
            videoUpload: true,
            codeBeautifierOptions: {
              end_with_newline: true,
              indent_inner_html: true,
              extra_liners: ["p", "h1", "h2", "h3", "h4", "h5", "h6"],
              brace_style: "expand",
              indent_char: " ",
              indent_size: 4,
              wrap_line_length: 80,
              wrap: true,
              lineWrap: true,
              maxWidth: 800,
            },
          }}
        />
        <button type="submit" onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </form>
    </main>
  );
}

export default AddArticle;
