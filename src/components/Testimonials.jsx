import React from 'react';
import { Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"


function Testimonials() {

  const reviews = [
    {
      quote: "Dylan and his team did a very good job on my lights, made me enjoy my Christmas a lot better and overall just are amazing workers, thanks guys!",
      author: "Owen Andresen"
    },
    {
      quote: "They did a very good job. Dylan and his crew had good service and super good prices. Definitely recommend.",
      author: "Ajitesh Sangar"
    },
    {
        quote: "Seattle Christmas Lights did a spectacular job making my home light up! Dylan and his crew were incredibly professional and the results blew me away. Highly recommend!",
        author: "Lucas Hakamada"
    },
    {
      quote: "They did a great job, very efficient and reasonably priced. Thanks Dylan and the rest of the crew! You guys did a great job!",
      author: "Kai Concepcion"
    },
    {
      quote: "Super happy with how the lights turned out. Looks great.",
      author: "Daniel Shubert"
    },
    {
      quote: "Great communication and my lights look fantastic!",
      author: "Andrew Brown"
    },
  ];

  return (
    <section className="section-padding bg-background-alt border-y border-border">
      <div className="container-content">
        <div className="text-center mb-12">
          <h2 className="h2 text-foreground mb-4">
            Trusted by Homeowners Across Seattle
          </h2>
          <p className="p-body text-muted-foreground">See what our clients say about us!</p>
        </div>
        
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent className="-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <div className="card bg-background p-8 flex flex-col h-full">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-accent fill-accent" />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground mb-4 italic p-body flex-grow">
                      "{review.quote}"
                    </blockquote>
                    <p className="font-bold text-foreground text-lg">- {review.author}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}

export default Testimonials;