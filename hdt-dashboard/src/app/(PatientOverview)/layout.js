import { Middleware } from "@/app/util/middleware"
export default function PatientLayout({ children }) {
   
    return(
        <Middleware> {children}</Middleware>
    )
}