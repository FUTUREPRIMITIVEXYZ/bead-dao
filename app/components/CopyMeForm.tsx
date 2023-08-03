import { useForm, SubmitHandler } from 'react-hook-form'
import clsx from 'clsx'
import { cva, type VariantProps } from 'class-variance-authority'

const exampleComponent = cva('replace this text with styles shared by all variants', {
  variants: {
    variant: {
      variant1: ['variant1style1 variant1style2'],
      variant2: ['variant2style1 variant2style2'],
    },
    defaultVariants: {
      variant: 'variant1',
    },
  },
})

type Inputs = {
  example: string
  exampleRequired: string
}
interface Props extends VariantProps<typeof exampleComponent> {
  className?: string
  isCopyable?: boolean
}

export function CopyMeForm({ variant, isCopyable, className, ...rest }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  console.log(watch('example')) // watch input value by passing the name of it

  return (
    <div
      className={clsx(
        // Base styles go here:
        'for example text-black opacity-25',

        // Styles for the active variant:
        exampleComponent({ variant }),

        // Conditional styles go here:
        {
          ['conditionalstyle1 additionalStyle1']: className?.includes('addStyleBlock1'),
          ['copyable']: isCopyable,
        },
        // Always allow external style overrides:
        className
      )}
      {...rest}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="test" {...register('example')} />

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register('exampleRequired', { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  )
}
