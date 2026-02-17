<script setup>
const emit = defineEmits(['editar'])

defineProps({
  ordens: Array,
  loading: Boolean
})

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

function statusClass(status) {
  if (!status) return ''
  const s = status.toLowerCase()
  if (s === 'aberta') return 'status-aberta'
  if (s === 'em andamento') return 'status-andamento'
  if (s === 'finalizada' || s === 'concluída') return 'status-finalizada'
  return ''
}
</script>

<template>
  <div class="list-card">
    <h2>Ordens de Serviço</h2>

    <div v-if="loading" class="loading">Carregando...</div>

    <div v-else-if="ordens.length === 0" class="empty">
      Nenhuma ordem de serviço cadastrada.
    </div>

    <div v-else class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Equipamento</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Entrada</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="os in ordens" :key="os.id">
            <td class="id-col">{{ os.id }}</td>
            <td>{{ os.cliente }}</td>
            <td>{{ os.equipamento }}</td>
            <td class="desc-col">{{ os.descricao }}</td>
            <td>
              <span class="status-badge" :class="statusClass(os.status)">
                {{ os.status }}
              </span>
            </td>
            <td>{{ formatDate(os.dataEntrada) }}</td>
            <td>
              <button class="btn-editar" @click="emit('editar', os)">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.list-card {
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

.loading,
.empty {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-size: 0.95rem;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f8f9fb;
}

th {
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  border-bottom: 2px solid #e5e7eb;
}

td {
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}

tr:hover {
  background: #f9fafb;
}

.id-col {
  font-weight: 600;
  color: #9ca3af;
}

.desc-col {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.status-aberta {
  background: #fef3c7;
  color: #92400e;
}

.status-andamento {
  background: #dbeafe;
  color: #1e40af;
}

.status-finalizada {
  background: #d1fae5;
  color: #065f46;
}

.btn-editar {
  padding: 0.35rem 0.85rem;
  background: #eef2ff;
  color: #4f46e5;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1.5px solid #c7d2fe;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-editar:hover {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
}
</style>
