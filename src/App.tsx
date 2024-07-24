import { useForm, SubmitHandler, set } from "react-hook-form"
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { useState } from "react"
import { API } from "./api"

const zodSchema = z.object({
  to: z.string().email({ message: "O email é inválido" }),
  company: z.string().min(3, { message: 'O nome da empresa deve ter no mínimo 3 caracteres' }),
  vacancy: z.string().min(3, { message: 'O nome da vaga deve ter no mínimo 3 caracteres' }),
  nameRecruiter: z.string().min(3, { message: 'O nome do Recrutador deve ter no mínimo 3 caracteres' }),
  skills: z.array(z.string()).nonempty({ message: 'Você deve selecionar pelo menos uma skill' }),
  subject: z.string().min(3, { message: 'O assunto deve ter no mínimo 3 caracteres' }),
})



type EmailSendType = z.infer<typeof zodSchema>

function App() {

  const [skillArr, setSkillArr] = useState<string[]>([
    'NodeJS',
    'Java',
    'PHP',
    "React",
    "Angular",
    "Vue",
    "HTML",
    "CSS",
    "Bootstrap",
    "Tailwind",
    "SASS",
    "Jenkins",
  ])



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<EmailSendType>({
    resolver: zodResolver(zodSchema)
  })
  const onSubmit: SubmitHandler<EmailSendType> = async (data) => {

    const skills = data.skills.join(', ')

    const payload = {
      ...data,
      skills
    }

    try {
      await API.post(`/mail`, payload)
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })

      reset();
    } catch (err) {
      console.log(err)
    }



  }

  return (
    <div onSubmit={handleSubmit(onSubmit)} className="w-[100%] h-[100vh] bg-slate-100">

      <div className="container bg-white-send mx-auto h-[100vh] grid grid-cols-2 gap-2">
        <div className="w-[100%] flex justify-center items-center border-r-4">
          <img src="/images/send-mail.jpg" alt="Logo application" />
        </div>
        <div className="flex justify-center items-center">
          <form className="w-[100%]  flex justify-center items-center flex-col gap-2 p-6 rshadow">
            <div className="w-[90%] h-[40px] p-2  flex justify-between items-center flex-row mt-1">
              <label htmlFor="to" className="w-[20%] font-bold">Para</label>
              <input type="text" id="to" className="w-[80%] rounded-md border-2" {...register("to")} />
            </div>
            {errors.to && <span className="w-[100%] h-[30px] text-center font-bold">{errors.to.message}</span>}
            <div className="w-[90%] h-[40px] p-2  flex justify-between items-center flex-row">
              <label htmlFor="company" className="w-[20%] font-bold">Empresa</label>
              <input type="text" id="company" className="w-[80%] rounded-md border-2" {...register("company")} />
            </div>

            {errors.company && <span className="w-[100%] h-[30px] text-center font-bold">{errors.company.message}</span>}

            <div className="w-[90%] h-[40px] p-2  flex justify-between items-center flex-row">
              <label htmlFor="vacancy" className="w-[20%] font-bold">Vaga</label>
              <input type="text" id="vacancy" className="w-[80%] rounded-md border-2" {...register("vacancy")} />
            </div>

            {errors.vacancy && <span className="w-[100%] h-[30px] text-center font-bold">{errors.vacancy.message}</span>}

            <div className="w-[90%] h-[40px] p-2  flex justify-between items-center flex-row">
              <label htmlFor="nameRecruiter" className="w-[20%] font-bold">Recrutador</label>
              <input type="text" id="nameRecruiter" className="w-[80%] rounded-md border-2" {...register("nameRecruiter")} />
            </div>

            {errors.nameRecruiter && <span className="w-[100%] h-[30px] text-center font-bold">{errors.nameRecruiter.message}</span>}



            <div className="w-[90%] h-[40px] p-2  flex justify-between items-center flex-row">
              <label htmlFor="subject" className="w-[20%] font-bold">Assunto</label>
              <input type="text" id="skisubjectlls" className="w-[80%] rounded-md border-2" {...register("subject")} />
            </div>

            {errors.subject && <span className="w-[100%] h-[30px] text-center font-bold">{errors.subject.message}</span>}

            <div className="w-[90%] h-[auto] p-2 flex justify-between items-center flex-row">
              <label className="w-[20%] font-bold">Skills</label>
              <div className="w-[80%] grid grid-cols-3">
                {skillArr.map((skill, index) => (
                  <label key={index}>
                    <input type="checkbox" value={skill} {...register("skills")} /> {skill}
                  </label>
                ))}

              </div>
            </div>
            {errors.skills && <span className="w-[100%] h-[30px] text-center font-bold">{errors.skills.message}</span>}

            <div className="w-[90%] h-[40px] p-2  flex justify-between items-center flex-row">
              <button type="submit" className="w-[100%] h-[40px] bg-zinc-500 font-bold rounded-lg text-slate-200">Enviar Email</button>
            </div>
          </form>
        </div>


      </div>
    </div>
  )
}

export default App
