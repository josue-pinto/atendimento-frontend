<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['criada'])

const form = reactive({
  cliente: '',
  equipamento: '',
  descricao: ''
})

const props = defineProps({
  loading: Boolean
})

function submit() {
  if (!form.cliente || !form.equipamento || !form.descricao) return
  emit('criada', { ...form })
  form.cliente = ''
  form.equipamento = ''
  form.descricao = ''
}
</script>

<template>
  <div class="form-card">
    <h2>Nova Ordem de Serviço</h2>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="cliente">Cliente</label>
        <input
          id="cliente"
          v-model="form.cliente"
          type="text"
          placeholder="Nome do cliente"
          required
        />
      </div>
      <div class="form-group">
        <label for="equipamento">Equipamento</label>
        <input
          id="equipamento"
          v-model="form.equipamento"
          type="text"
          placeholder="Ex: Notebook Dell, Impressora HP..."
          required
        />
      </div>
      <div class="form-group">
        <label for="descricao">Descrição do Problema</label>
        <textarea
          id="descricao"
          v-model="form.descricao"
          placeholder="Descreva o problema do equipamento..."
          rows="3"
          required
        ></textarea>
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Salvando...' : 'Abrir Ordem de Serviço' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.form-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.25rem;
  color: #1a1a2e;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

input,
textarea {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

textarea {
  resize: vertical;
}

button {
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.5rem;
  background: #4f46e5;
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover:not(:disabled) {
  background: #4338ca;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
