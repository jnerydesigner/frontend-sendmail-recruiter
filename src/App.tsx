import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios'
import {zodResolver} from '@hookform/resolvers/zod'
import { z } from "zod"

const zodSchema = z.object({
  to: z.string().email(),
  company: z.string().min(3, {message: 'O nome da empresa deve ter no mínimo 3 caracteres'}),
  vacancy: z.string().min(3,{message: 'O nome da vaga deve ter no mínimo 3 caracteres'}),
  nameRecruiter: z.string().min(3,{message: 'O nome do Recrutador deve ter no mínimo 3 caracteres'}),
  skills: z.string().min(3,{message: 'Suas Skills devem ter no mínimo 3 caracteres'}),
  subject: z.string().min(3,{message: 'O assunto deve ter no mínimo 3 caracteres'}),
})



type EmailSendType = z.infer<typeof zodSchema>

function App() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSendType>({
    resolver: zodResolver(zodSchema)
  })
  const onSubmit: SubmitHandler<EmailSendType> = async (data) => {
    await axios.post('http://localhost:3333/mail', data)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div onSubmit={handleSubmit(onSubmit)} className="w-[100%] h-[100vh] bg-slate-100">
      <div className="container bg-slate-200 mx-auto h-[100vh] flex justify-center items-center">
        <form className="w-[700px] bg-red-200 flex justify-center items-center flex-col gap-2 p-6 rounded-xl shadow">
          <div className="w-[70%] h-[40px] p-2  flex justify-between items-center flex-row mt-1">
            <label htmlFor="to" className="w-[20%]">Para</label>
            <input type="text" id="to" className="w-[80%] rounded-sm" {...register("to")}/>
          </div>
          <div className="w-[70%] h-[40px] p-2  flex justify-between items-center flex-row mt-1">
            {errors.to && <span>{errors.to.message}</span>}
          </div>
          <div className="w-[70%] h-[40px] p-2  flex justify-between items-center flex-row">
            <label htmlFor="company" className="w-[20%]">Empresa</label>
            <input type="text" id="company" className="w-[80%] rounded-sm" {...register("company")}/>
          </div>
          <div className="w-[70%] h-[40px] p-2  flex justify-between items-center flex-row mt-1">
            {errors.company && <span>{errors.company.message}</span>}
          </div>
          <div className="w-[70%] h-[40px] p-2  flex justify-between items-center flex-row">
            <label htmlFor="vacancy" className="w-[20%]">Vaga</label>
            <input type="text" id="vacancy" className="w-[80%] rounded-sm" {...register("vacancy")} />
          </div>
          <div className="w-[70%] h-[40px] p-2  flex justify-between items-center flex-row mt-1">
            {errors.vacancy && <span>{errors.vacancy.message}</span>}
          </div>
          <div className="w-[70%] h-[40px] p-2  flex justify-between items-center flex-row">
            <label htmlFor="nameRecruiter" className="w-[20%]">Recrutador</label>
            <input type="text" id="nameRecruiter" className="w-[80%] rounded-sm" {...register("nameRecruiter")} />
          </div>
          <div className="w-[70%] h-[40px] p-2  flex justify-between items-center flex-row mt-1">
            {errors.nameRecruiter && <span>{errors.nameRecruiter.message}</span>}
          </div>
          <div className="w-[70%] h-[40px] p-2  flex justify-between items-center flex-row">
            <label htmlFor="skills" className="w-[20%]">Skils</label>
            <input type="text" id="skills" className="w-[80%] rounded-sm" {...register("skills")} />
          </div>
          <div className="w-[70%] h-[40px] p-2  flex justify-between items-center flex-row mt-1">
            {errors.skills && <span>{errors.skills.message}</span>}
          </div>
          <div className="w-[70%] h-[40px] p-2  flex justify-between items-center flex-row">
            <label htmlFor="subject" className="w-[20%]">Assunto</label>
            <input type="text" id="skisubjectlls" className="w-[80%] rounded-sm" {...register("subject")} />
          </div>
          <div className="w-[70%] h-[40px] p-2  flex justify-between items-center flex-row mt-1">
            {errors.subject && <span>{errors.subject.message}</span>}
          </div>
          <div className="w-[70%] h-[40px] p-2  flex justify-between items-center flex-row">
           <button type="submit" className="w-[100%] h-[40px] bg-red-300 font-bold rounded-lg">Enviar Email</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default App
