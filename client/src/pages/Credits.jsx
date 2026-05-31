import { useState, useEffect } from "react"
import { useAppContext } from '../context/AppContext'
import Loading from "./Loading"
import toast from "react-hot-toast"


const Credits = () => {

    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const { token, axios } = useAppContext()

    const fetchPlans = async () => {
      try{
        const {data} = await axios.get('/api/credit/plan', {headers: {Authorization: token}})
        if(data.success){
          setPlans(data.plans)
        }else{
          toast.error(data.message || 'Failed to fetch plans')
        }
      }catch(err){
        toast.error(err.message)
      }
      setLoading(false)
    }

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          reject(new Error("Something is not right"));
        };
        document.body.appendChild(script);
      });
    };

    const purchasePlan = async (e, planId) => {
      e.preventDefault();
      
      
      try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if (!res) {
        toast.error("Razorpay SDK failed to load")
        return;
        } 

        const {data} = await axios.post("/api/credit/purchase",{planId}, {headers: {Authorization: token}})

        if (!data.success || !data.order) {
          toast.success("Order is not created")
          return;
        }

        const order = data.order

        const options = {
          key: import.meta.env.VITE_RAZORPAY_TEST_API_KEY,
          amount: order.amount,
          currency: order.currency,
          name: "BuddyAI",
          description: "Credit Purchase",
          order_id: order.id,

          handler: async function (response) {
            setLoading(true)
          }
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
        rzp.on("payment.failed", function (response) {
          toast.error("Payment failed")
        })

      } catch (err) {
        toast.error(err.message)
      }
    }
    

    useEffect(() => {
      fetchPlans()
    },[])

    if (loading) return <Loading/>

  return (
    <div className="max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className='text-3xl font-semibold text-center mb-10 xl:mt-30 text-gray-800 dark:text-white'>Credit Plans</h2>
      <div className='flex flex-wrap justify-center items-center gap-8'>
        {plans.map((plan) => (
          <div key={plan._id} className="border border-sky-500 dark:border-sky-700 rounded-xl shadow-md p-6 min-w-[250px] flex flex-col bg-white dark:bg-gray-900 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-102 hover:border-sky-400 hover:shadow-[0_10px_10px_rgba(14,165,233,0.25)]">
            <div className='flex-1'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>{plan.name}</h3>
              <p className='text-2xl font-bold text-sky-600 mb-4 '>₹{plan.price}<span className="text-base font-normal text-gray-600 dark:text-white">{' '}/ {plan.credits} credits</span></p>
              <ul className='list-disc list-inside text-sm text-gray-500 dark:text-white space-y-1'>
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <button onClick={(e) => toast.promise(purchasePlan(e, plan._id), {loading: "Processing..."})} className='mt-6 bg-[#2c67f2]/90 hover:bg-blue-700 active:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors cursor-pointer'>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Credits
