import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import StudentList from '@/components/StudentList.vue'
import StudentForm from '@/components/StudentForm.vue'

const routes = [
  { path: '/', component: DefaultLayout, children: [
      { path: 'students', component: StudentList },
      { path: 'students/new', component: StudentForm },
      { path: 'students/:ra/edit', component: StudentForm },
      { path: '', redirect: 'students' },
    ]
  }
]

export default createRouter({ history: createWebHistory(), routes })
