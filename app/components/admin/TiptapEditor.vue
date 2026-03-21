<template>
  <div class="border border-gray-300 rounded-md overflow-hidden bg-white shadow-sm font-sans flex flex-col">
    <!-- Toolbar -->
    <div v-if="editor" class="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
      <button 
        type="button" 
        @click="editor.chain().focus().toggleBold().run()" 
        :class="{ 'bg-emerald-100 text-emerald-800': editor.isActive('bold'), 'text-gray-700 hover:bg-gray-200': !editor.isActive('bold') }" 
        class="p-1.5 rounded transition-colors"
        title="Bold"
      >
        <Icon name="lucide:bold" class="w-4 h-4" />
      </button>
      
      <button 
        type="button" 
        @click="editor.chain().focus().toggleItalic().run()" 
        :class="{ 'bg-emerald-100 text-emerald-800': editor.isActive('italic'), 'text-gray-700 hover:bg-gray-200': !editor.isActive('italic') }" 
        class="p-1.5 rounded transition-colors"
        title="Italic"
      >
        <Icon name="lucide:italic" class="w-4 h-4" />
      </button>

      <div class="w-px h-5 bg-gray-300 mx-1"></div>

      <button 
        type="button" 
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" 
        :class="{ 'bg-emerald-100 text-emerald-800': editor.isActive('heading', { level: 2 }), 'text-gray-700 hover:bg-gray-200': !editor.isActive('heading', { level: 2 }) }" 
        class="p-1.5 rounded transition-colors font-bold text-sm"
        title="Heading 2"
      >
        H2
      </button>

      <button 
        type="button" 
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" 
        :class="{ 'bg-emerald-100 text-emerald-800': editor.isActive('heading', { level: 3 }), 'text-gray-700 hover:bg-gray-200': !editor.isActive('heading', { level: 3 }) }" 
        class="p-1.5 rounded transition-colors font-bold text-sm"
        title="Heading 3"
      >
        H3
      </button>

      <div class="w-px h-5 bg-gray-300 mx-1"></div>

      <button 
        type="button" 
        @click="editor.chain().focus().toggleBulletList().run()" 
        :class="{ 'bg-emerald-100 text-emerald-800': editor.isActive('bulletList'), 'text-gray-700 hover:bg-gray-200': !editor.isActive('bulletList') }" 
        class="p-1.5 rounded transition-colors"
        title="Bullet List"
      >
        <Icon name="lucide:list" class="w-4 h-4" />
      </button>

      <button 
        type="button" 
        @click="editor.chain().focus().toggleOrderedList().run()" 
        :class="{ 'bg-emerald-100 text-emerald-800': editor.isActive('orderedList'), 'text-gray-700 hover:bg-gray-200': !editor.isActive('orderedList') }" 
        class="p-1.5 rounded transition-colors"
        title="Numbered List"
      >
        <Icon name="lucide:list-ordered" class="w-4 h-4" />
      </button>

      <div class="w-px h-5 bg-gray-300 mx-1"></div>

      <button 
        type="button" 
        @click="editor.chain().focus().undo().run()" 
        :disabled="!editor.can().chain().focus().undo().run()"
        class="p-1.5 rounded text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Undo"
      >
        <Icon name="lucide:undo" class="w-4 h-4" />
      </button>

      <button 
        type="button" 
        @click="editor.chain().focus().redo().run()" 
        :disabled="!editor.can().chain().focus().redo().run()"
        class="p-1.5 rounded text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Redo"
      >
        <Icon name="lucide:redo" class="w-4 h-4" />
      </button>
    </div>

    <!-- Editor Content -->
    <div class="p-4 prose prose-emerald max-w-none flex-1 min-h-[300px] bg-white cursor-text">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, onMounted, onBeforeUnmount, watch } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const editor = shallowRef<Editor>()

// Initialize Tiptap ONLY on client-side onMounted to avoid SSR issues
onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [
      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[300px] w-full',
      },
    },
    onUpdate: ({ editor }) => {
      emit('update:modelValue', editor.getHTML())
    },
  })
})

// Cleanup to prevent memory leaks
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

// Watch modelValue from parent to update editor (if changed externally, like initialization)
watch(() => props.modelValue, (value) => {
  if (editor.value) {
    const isSame = editor.value.getHTML() === value
    if (!isSame) {
      editor.value.commands.setContent(value, { emitUpdate: false })
    }
  }
})
</script>

<style>
/* Tiptap removes default outlines, we handle padding/min-height in editorProps */
.ProseMirror p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
