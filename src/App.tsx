import './App.css'
import CheckoutStepper from './components/Stepper'

function App() {
  interface checkoutSteps {
    name : string;
    component : () => JSX.Element;

  }
  const name  = "vendant"
  const CHECKOUT_STEPS : checkoutSteps[] = [
    {
      name : "Customer Info",
      component : function() {
        return <div> Provide your contact details.</div>
      },
    },
    {
      name : "Shipping Info",
      component : () => <div>Provide your shipping Info.</div>
    },
    {
      name : "Payment",
      component: () => <div>Complete payment for your order.</div>
    },
    {
      name : "Delivered",
      component : () => <div>Your order has been delivered.</div>
    }
  ]
  
  return (
    <>
      <CheckoutStepper stepsConfig = {CHECKOUT_STEPS}/>
    </>
  )
}

export default App
