import React from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import { ContentState } from 'draft-js';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Skeleton from '@mui/material/Skeleton';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./css.css";

const toolbar_set =   {
                        inline: {
                          inDropdown: false,
                        },
                        blockType: {
                          inDropdown: true,
                        },
                        fontSize: {
                          inDropdown: false,
                        },
                        fontFamily: false,
                        list: {
                          inDropdown: false,
                        },
                        textAlign: {
                          inDropdown: false,
                        },
                        colorPicker: {
                          inDropdown: false,
                        },
                        link: {
                          inDropdown: false,
                        },
                        image: {
                          className: undefined,
                          component: undefined,
                          popupClassName: undefined,
                          urlEnabled: false,
                          uploadEnabled: false,
                          alignmentEnabled: true,
                          uploadCallback: undefined,
                          previewImage: false,
                          inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                          alt: { present: false, mandatory: false },
                          defaultSize: {
                            height: 'auto',
                            width: 'auto',
                          },
                        },
                        remove:   {
                          inDropdown: false,
                        },
                        history:  {
                          inDropdown: false,
                          className: undefined,
                          component: undefined,
                          dropdownClassName: undefined,
                          options: ['undo', 'redo'],
                        },
                      }

let contentState  =    false;
let editorState__ =    false;


const Textarea=({name,inputs,onChange,toolbar,loading})=>{

    const [editorState,setEditorState]                =   React.useState(false)
    const [editorStateStandby,setEditorStateStandby]  =   React.useState(true)

    const handleEditorState=(editorState2)=>{
      setEditorState(editorState2)
      onChange(name,draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }

    React.useEffect(()=>{
      setEditorState(EditorState.createEmpty())
    },[])


    React.useEffect(()=>{

      if (editorState && editorState.getCurrentContent) {
        if (onChange) {
          //onChange(name,draftToHtml(convertToRaw(editorState.getCurrentContent())))
        }
      }

    },[name,onChange])

    React.useEffect(()=>{

      if (inputs[name] && editorStateStandby) {
        setEditorStateStandby(false)
        const html          =   inputs[name];
        const contentBlock  =   htmlToDraft(html);
        if (contentBlock) {
          contentState    =   ContentState.createFromBlockArray(contentBlock.contentBlocks);
          editorState__   =   EditorState.createWithContent(contentState);
          setEditorState(editorState__)
        }
      }

    },[editorStateStandby,inputs,name])


    return    <>
                {
                  loading?<>
                      <Skeleton variant="rectangular" width={"100%"} sx={{height:{xs:6,md:185}}}/>
                    </>:<>
                      <Editor
                        localization={{
                          locale: 'es',
                        }}
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={handleEditorState}
                        toolbar={toolbar?toolbar_set:false}
                      />
                  </>
                }

              </>
}

export default Textarea
