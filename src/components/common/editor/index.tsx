'use client'
import dynamic from 'next/dynamic';
import React, { useState, type FC } from 'react';
import './style.css'

const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
})
interface RichEditorProps {
    text?: string
    onValueChange(text: string): void
}

const RichEditor: FC<RichEditorProps> = ({ onValueChange, text = '' }) => {
    const [value, setValue] = useState(text);

    const toolbarOptions = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ color: [] }],
        [{ align: [] }],
        ['clean'],
    ]

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',       // ✅ include this
        'indent',
        'link',
        'image',
    ]

    const handleChange = (text: string) => {
        setValue(text)
        onValueChange(text)
    }

    return (
        <div className="relative">
            <ReactQuill
                className='h-96 '
                value={value}
                onChange={handleChange}
                modules={{ toolbar: toolbarOptions }}
                formats={formats} />
        </div>
    )
}

export default RichEditor;
