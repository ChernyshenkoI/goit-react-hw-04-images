import { useState, useEffect } from 'react';
import { API } from './API/API';

import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

const imgAPI = new API();

export const App = () =>{
  
    const [images,setImages]=useState([])
    const [page, setPage]= useState(1)
    const [query, setQuery] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const [isOpenModal,setIsOpenModal] = useState(false)
    const [largeImg,setLargeImg] = useState('')
    const [description,setDescription]= useState('')
  

  const onSubmit = e => {
    e.preventDefault();
    
      setQuery(e.target.elements.input.value)
      setPage(1)
      setImages([])
   
    e.target.reset();
  };

  const onClickOpenModal = (url, description) => {
    setIsLoading(true)
    setLargeImg(url)
    setDescription(description)
    setIsOpenModal(true)
    setIsLoading(false);
  };

  const onClickCloseModal = e => {
    if (e.currentTarget === e.target || e.key === 'Escape') {
      setIsOpenModal(false)
    }
  };

  const onLoadMore = async () => {
    
    setPage(prevPage => prevPage +1)
  };

  useEffect(() => {
   
     const fetchData = async (query, page)=> {
      try {
        setIsLoading(true)
        const { hits } = await imgAPI.fetchImgs(query, page);
        setImages(prevImgs => [...prevImgs, ...hits]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
     }
     if (query !== "") {
      fetchData(query, page)
     }
    
  },[page, query])


  // async componentDidUpdate(prevProps, prevState) {
  //   const { page } = this.state;
  //   const { query } = this.state;
  //   if (prevState.page !== page || prevState.query !== query) {
  //     this.setState({ isLoading: true });
  //     try {
  //       const { hits } = await imgAPI.fetchImgs(query, page);
  //       this.setState({ images: [...prevState.images, ...hits] });
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }
  
    return (
      <>
        <SearchBar onSubmit={onSubmit} />
        <ImageGallery
          images={images}
          onModalOpen={onClickOpenModal}
        />
        {images.length !== 0 && (
          <Button onLoadMore={onLoadMore} btnText="Load more..." />
        )}
        {isOpenModal && (
          <Modal
            onClickCloseModal={onClickCloseModal}
            img={largeImg}
            description={description}
          />
        )}
        {isLoading && <Loader />}
      </>
    );
  
}
