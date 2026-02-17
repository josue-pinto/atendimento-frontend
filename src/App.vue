<script setup>
import { ref, onMounted } from 'vue'
import api from './services/api.js'
import OrdemServicoForm from './components/OrdemServicoForm.vue'
import OrdemServicoList from './components/OrdemServicoList.vue'

const ordens = ref([])
const loadingList = ref(false)
const loadingForm = ref(false)
const editando = ref(null)

async function carregarOrdens() {
  loadingList.value = true
  try {
    const { data } = await api.get('/os')
    ordens.value = data
  } catch (err) {
    console.error('Erro ao carregar ordens:', err)
  } finally {
    loadingList.value = false
  }
}

async function criarOrdem(os) {
  loadingForm.value = true
  try {
    await api.post('/os', os)
    await carregarOrdens()
  } catch (err) {
    console.error('Erro ao criar ordem:', err)
  } finally {
    loadingForm.value = false
  }
}

async function atualizarOrdem(os) {
  loadingForm.value = true
  try {
    await api.put(`/os/${os.id}`, os)
    editando.value = null
    await carregarOrdens()
  } catch (err) {
    console.error('Erro ao atualizar ordem:', err)
  } finally {
    loadingForm.value = false
  }
}

function editarOrdem(os) {
  editando.value = { ...os }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function cancelarEdicao() {
  editando.value = null
}

onMounted(carregarOrdens)
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>Sistema de Ordens de Serviço</h1>
      <p>Gerencie as ordens de serviço de atendimento técnico</p>
    </header>

    <main class="app-content">
      <OrdemServicoForm
        :loading="loadingForm"
        :editando="editando"
        @criada="criarOrdem"
        @atualizada="atualizarOrdem"
        @cancelar="cancelarEdicao"
      />
      <OrdemServicoList
        :ordens="ordens"
        :loading="loadingList"
        @editar="editarOrdem"
      />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: #f3f4f6;
}

.app-header {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  padding: 2rem;
  text-align: center;
}

.app-header h1 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
}

.app-header p {
  margin: 0.5rem 0 0 0;
  font-size: 0.95rem;
  opacity: 0.85;
}

.app-content {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
