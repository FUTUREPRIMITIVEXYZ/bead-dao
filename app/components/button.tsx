import clsx from 'clsx'
import { cva, type VariantProps } from 'class-variance-authority'

const button = cva('replace this text with styles shared by all variants', {
  variants: {
    variant: {
      default: ['aqua-button aqua-button-blue inline-block'],
      aquaGrey: ['aqua-button aqua-button-grey inline-block'],
    },
    defaultVariants: {
      variant: 'default',
    },
  },
})

interface Props extends VariantProps<typeof button> {
  className?: string
}

export const Button: React.FC<Props & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  type = 'button',
  children,
  variant = 'default',
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      className={clsx(button({ variant }), className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// button {
//   -webkit-appearance: none;
//   border: 1px solid #ccc;
//   border-radius: 125px;
//   box-shadow: inset 0 13px 25px rgba(255,255,255,0.5), 0 3px 5px rgba(0,0,0,0.2), 0 10px 13px rgba(0,0,0,0.1);
//   cursor: pointer;
//   font-family: 'Lucida Grande', Helvetica, Arial, sans-serif;
//   font-size: 2rem;
//   margin: 5rem 1rem;
//   padding: 1.2rem 4rem;
//   position: relative;
//   transition: all ease .3s;
// }
// button:hover {
//   box-shadow: inset 0 13px 25px rgba(255,255,255,0.8), 0 3px 5px rgba(0,0,0,0.2), 0 10px 13px rgba(0,0,0,0.2);
//   transform: scale(1.02);
// }
// button:before {
//   background: linear-gradient(rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
//   border-radius: 125px;
//   content:'';
//   height: 50px;
//   left: 4%;
//   position: absolute;
//   top: 1px;
//   transition: all ease .3s;
//   width: 92%;
// }

// button.confirm {
//   background: #4A90E2;
//   border-color: #3672B6;
//   color: #fff;
// }
