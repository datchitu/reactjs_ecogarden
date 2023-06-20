import Skeleton from 'react-loading-skeleton';
function LoadingCategory()
{
    return (
        <>
            <div className='lists-category-home-item'>
                    <Skeleton height={50} /> 
                    <Skeleton  count={1} /> 
            </div>
            <div className='lists-category-home-item'>
                    <Skeleton height={50} /> 
                    <Skeleton  count={1} /> 
            </div>
            <div className='lists-category-home-item'>
                    <Skeleton height={50} /> 
                    <Skeleton  count={1} /> 
            </div>
            <div className='lists-category-home-item'>
                    <Skeleton height={50} /> 
                    <Skeleton  count={1} /> 
            </div>
            <div className='lists-category-home-item'>
                    <Skeleton height={50} /> 
                    <Skeleton  count={1} /> 
            </div>
            <div className='lists-category-home-item'>
                    <Skeleton height={50} /> 
                    <Skeleton  count={1} /> 
            </div>
        </>
    )
}

export default LoadingCategory;