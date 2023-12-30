function RouteUser() {
    return ( 
        <div>
            <Route path='/' element={<DefaultLayout><Home/></DefaultLayout>}  ></Route>
            <Route path='/album/:id' element={<DefaultLayout><DetailAlbum/></DefaultLayout>}  ></Route>
            <Route path='/playlist/:id' element={<DefaultLayout><DetailPlayList/></DefaultLayout>}></Route>
        </div>

     );
}

export default RouteUser;