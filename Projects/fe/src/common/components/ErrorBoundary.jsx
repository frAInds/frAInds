export const ErrorBoundary = () => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="items-center justify-center w-full h-full">
        존재하지 않는 페이지 입니다. url을 확인해주세요
      </div>
    </div>
  )
}

export default ErrorBoundary;