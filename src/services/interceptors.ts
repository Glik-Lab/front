import axios, { InternalAxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'

const jwtInterceptor = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
})

jwtInterceptor.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let token = localStorage.getItem('access_token')

    config.headers = config.headers ?? {}

    // config.headers = {
    //   Authorization: `Bearer ${token}`,
    // }

    config.headers.set('Authorization', `Bearer ${token}`)

    console.log(`Resposta do Interceptor: ${config}`)

    return config
  }
)

jwtInterceptor.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response.status == 401) {
      //  const authData = localStorage.getItem("access_token")
      //  const payload = {
      //      access_token: authData,
      //     refresh_token: authData.refreshToken,
      //  }

      let apiResponse = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + '/refresh'
      )

      if (apiResponse) {
        localStorage.setItem('access_token', apiResponse.data)

        error.config.headers[
          'Authorization'
        ] = `bearer ${apiResponse.data.access_token}`
      } else {
        console.log(error)

        localStorage.removeItem('acess_token')

        const router = useRouter()

        router.push('/login')
      }

      return axios(error.config)
    }
  }
)

export default jwtInterceptor
