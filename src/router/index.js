import {createRouter,createWebHashHistory} from "vue-router"
import test1 from "@/components/test1"

const routes = [
    {
        path:"/",
        redirect:"login"
    },
    {
        name:"login",
        path:"/login",
        component: ()=>import("@/views/login")
    },
    {
        name:"room",
        path:"/room",
        component: ()=>import("@/views/room")
    },
    {
        path:"/test1",
        component:test1
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;