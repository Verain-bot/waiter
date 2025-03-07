import { createContext, useContext, useState } from "react";

type ReviewContextType = {
    name: string;
    stars: number;
    body: string;
  }  

type RatingsContextType = {
    title: string
    canRate: boolean
    showReviews: boolean
    reviews: ReviewContextType[]
    url: string
    starFieldName: string
    bodyFieldName: string
    actionURL: string
    starsSelected: number
    reviewWritten: string
  }

const RatingsContext = createContext<[RatingsContextType, React.Dispatch<React.SetStateAction<RatingsContextType>>] | undefined>(undefined);

export const RatingContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [ratings, setRatings] = useState<RatingsContextType>({
        title: 'Title',
        canRate: false,
        showReviews: false,
        reviews: [
          {
            name: 'Verain',
            stars: 4,
            body: 'Something, Something, Something, Something, Something, Something, Something, Something, Something, Something, Something, Something, Something, Something, ',
          },
        ],
        url: 'nan',
        starFieldName: 'stars',
        bodyFieldName: 'body',
        actionURL: 'nan',
        starsSelected: 0,
        reviewWritten: ''

      })

    return (
        <RatingsContext.Provider value={[ratings, setRatings]}>
            {children}
        </RatingsContext.Provider>
    )
}

export const useRatingContext = () => {
    const context = useContext(RatingsContext);
    if (context === undefined) {
      throw new Error(
        'useRatingContext must be used within a RatingsProvider'
      );
    }
    return context;
}