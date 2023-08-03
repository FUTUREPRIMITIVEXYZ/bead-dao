import clsx from 'clsx'

export default function Custom404() {
  return (
    <main className={clsx('flex flex-col gap-5 flex-1 justify-center items-center')}>
      <div className={clsx('flex flex-col justify-center items-center')}>
        <h1>404 - Page Not Found</h1>
      </div>
    </main>
  )
}
