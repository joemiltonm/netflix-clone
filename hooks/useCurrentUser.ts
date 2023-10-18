
import useSWR from "swr";

// swr is vercel package to fetch data. state management can be avoided.

import fetcher from '../libs/fetcher'

const useCurrentUser = () => {
    const {data, error, isLoading, mutate} = useSWR('/api/current', fetcher)

    return {
        data,
        error,
        isLoading,
        mutate,
    }

}

export default useCurrentUser;