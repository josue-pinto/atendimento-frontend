<script setup>
import { reactive, watch } from 'vue'

const emit = defineEmits(['criada', 'atualizada', 'cancelar'])

const props = defineProps({
  loading: Boolean,
  editando: Object
})

const form = reactive({
  cliente: '',
  equipamento: '',
  descricao: '',
  status: 'ABERTA'
})

watch(() => props.editando, (os) => {
  if (os) {
    form.cliente = os.cliente
    form.equipamento = os.equipamento
    form.descricao = os.descricao
    form.status = os.status
  } else {
    limpar()
  }
}, { immediate: true })

function limpar() {
  form.cliente = ''
  form.equipamento = ''
  form.descricao = ''
  form.status = 'ABERTA'
}

function submit() {
  if (!form.cliente || !form.equipamento || !form.descricao) return
  if (props.editando) {
    emit('atualizada', { id: props.editando.id, ...form })
  } else {
    emit('criada', { ...form })
  }
  limpar()
}

function cancelar() {
  limpar()
  emit('cancelar')
}
</script>

<template>
  <div class="form-card">
    <div class="form-header">
      <h2>{{ editando ? 'Editar Ordem de Serviço' : 'Nova Ordem de Serviço' }}</h2>
      <button v-if="editando" class="btn-cancelar" @click="cancelar">Cancelar</button>
    </div>
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
      <div v-if="editando" class="form-group">
        <label for="status">Status</label>
        <select id="status" v-model="form.status">
          <option value="ABERTA">ABERTA</option>
          <option value="EM ANDAMENTO">EM ANDAMENTO</option>
          <option value="FINALIZADA">FINALIZADA</option>
        </select>
      </div>
      <button type="submit" class="btn-submit" :disabled="loading">
        {{ loading ? 'Salvando...' : (editando ? 'Salvar Alterações' : 'Abrir Ordem de Serviço') }}
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

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.form-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #1a1a2e;
}

.btn-cancelar {
  padding: 0.4rem 1rem;
  background: #f3f4f6;
  color: #374151;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-cancelar:hover {
  background: #e5e7eb;
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
textarea,
select {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  transition: border-color 0.2s;
  box-sizing: border-box;
  background: #fff;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

textarea {
  resize: vertical;
}

.btn-submit {
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

.btn-submit:hover:not(:disabled) {
  background: #4338ca;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
