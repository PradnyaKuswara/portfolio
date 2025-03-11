import React from 'react';

import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  ConditionalContents,
  CreateLink,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  InsertAdmonition,
  InsertCodeBlock,
  InsertFrontmatter,
  InsertImage,
  InsertSandpack,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  SandpackConfig,
  sandpackPlugin,
  Separator,
  ShowSandpackInfo,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

const defaultSnippetContent = `
export default function App() {
return (
<div className="App">
<h1>Hello CodeSandbox</h1>
<h2>Start editing to see some magic happen!</h2>
</div>
);
}
`.trim();

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

interface TextEditorProps {
  label?: string;
  isLabel?: boolean;
  field: React.InputHTMLAttributes<HTMLInputElement>;
  fieldState: { error?: { message?: string } };
}

const TextEditor: React.FC<TextEditorProps> = ({
  field,
  fieldState,
  label,
  isLabel,
}) => {
  return (
    <>
      {isLabel && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <MDXEditor
        onChange={(markdown: string) =>
          field.onChange?.({
            target: { value: markdown },
          } as React.ChangeEvent<HTMLInputElement>)
        }
        markdown={(field.value as string) || 'Type here...'}
        className="!z-[100000] !relative !border !rounded-[0.2rem] !border-gray-300 !shadow-sm !bg-white !text-sm !p-2 !w-full !h-[300px] !overflow-y-auto !resize-none"
        contentEditableClassName="custom-prose-styles"
        plugins={[
          codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
          sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              css: 'CSS',
              ts: 'TypeScript',
              js: 'JavaScript',
              php: 'PHP',
              html: 'HTML',
              json: 'JSON',
            },
          }),
          linkPlugin(),
          linkDialogPlugin(),
          headingsPlugin(),
          markdownShortcutPlugin(),
          quotePlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
          imagePlugin({
            imageUploadHandler: async (image: File) => {
              // Create a new URL object from the image file
              const imageUrl = URL.createObjectURL(image);

              // Return the URL to be used as the src attribute of the <img> tag
              return imageUrl;
            },
            imageAutocompleteSuggestions: [
              '<img src="https://picsum.photos/200/300" alt="Sample Image" />',
              '<img src="https://picsum.photos/200" alt="Sample Image" />',
            ],
          }),
          listsPlugin(),
          frontmatterPlugin(),
          diffSourcePlugin({
            diffMarkdown: 'An older version',
            viewMode: 'rich-text',
          }),
          directivesPlugin({
            directiveDescriptors: [AdmonitionDirectiveDescriptor],
          }),
          toolbarPlugin({
            toolbarClassName: 'toolbar',
            toolbarContents: () => (
              <>
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                  <InsertTable />
                  <BlockTypeSelect />
                  <BoldItalicUnderlineToggles />
                  <CodeToggle />
                  <InsertFrontmatter />
                  <InsertImage />
                  <CreateLink />
                  <ListsToggle></ListsToggle>
                  <InsertThematicBreak></InsertThematicBreak>
                  <InsertAdmonition />
                  <Separator></Separator>
                  <ConditionalContents
                    options={[
                      {
                        when: (editor) => editor?.editorType === 'codeblock',
                        contents: () => <ChangeCodeMirrorLanguage />,
                      },
                      {
                        when: (editor) => editor?.editorType === 'sandpack',
                        contents: () => <ShowSandpackInfo />,
                      },
                      {
                        fallback: () => (
                          <>
                            <InsertCodeBlock />
                            <InsertSandpack />
                          </>
                        ),
                      },
                    ]}
                  />
                </DiffSourceToggleWrapper>
              </>
            ),
          }),
        ]}
      />
      <p className="text-xs text-error mt-2">{fieldState.error?.message}</p>
    </>
  );
};

export default TextEditor;
