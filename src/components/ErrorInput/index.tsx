type Props = {
  message?: string;
}

const ErrorInput = ({message}: Props) => {
  return (
    <span className='text-red-500 text-xs font-medium italic'>{message}</span>
  )
}

export default ErrorInput