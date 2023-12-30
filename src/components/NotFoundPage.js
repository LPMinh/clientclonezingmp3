import { useAppContext } from "../context/AppContext";

function NotFoundPage() {
    const {state,dispatch}=useAppContext();
    console.log(state.role.toString());
    return ( 
    <div>
        <h1 style={{color:'white',marginTop:'200px'}}>Không tìm thấy hoặc bạn không có quyền truy cập</h1>
    </div>
     );
}

export default NotFoundPage;