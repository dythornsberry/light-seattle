import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Phone, Edit, CheckCircle, ArrowLeft, MapPin } from 'lucide-react';
import ImageOptimizer from '@/components/ImageOptimizer';
import { Button } from '@/components/ui/button';
import useStickyCta from '@/hooks/useStickyCta';

const cityNameToPath = {
  'Seattle': 'seattle',
  'Kenmore': 'kenmore',
  'Kirkland': 'kirkland',
  'Bellevue': 'bellevue',
  'Woodinville': 'woodinville',
  'Bothell': 'bothell',
  'Lake Forest Park': 'lake-forest-park',
  'Everett': 'everett',
  'Lynnwood': 'lynnwood',
  'Shoreline': 'shoreline',
  'Mercer Island': 'mercer-island',
  'Medina': 'medina',
  'Clyde Hill': 'clyde-hill',
  'Hunts Point': 'hunts-point',
};

const nearbyAreas = {
  'Seattle': ['Shoreline', 'Mercer Island', 'Bellevue', 'Kirkland'],
  'Kenmore': ['Bothell', 'Lake Forest Park', 'Kirkland', 'Woodinville'],
  'Kirkland': ['Bellevue', 'Bothell', 'Kenmore', 'Woodinville'],
  'Bellevue': ['Kirkland', 'Mercer Island', 'Medina', 'Clyde Hill'],
  'Woodinville': ['Bothell', 'Kirkland', 'Kenmore', 'Redmond'],
  'Bothell': ['Kenmore', 'Woodinville', 'Lake Forest Park', 'Lynnwood'],
  'Lake Forest Park': ['Kenmore', 'Shoreline', 'Bothell', 'Seattle'],
  'Everett': ['Lynnwood', 'Shoreline', 'Bothell'],
  'Lynnwood': ['Shoreline', 'Everett', 'Bothell', 'Kenmore'],
  'Shoreline': ['Seattle', 'Lake Forest Park', 'Lynnwood', 'Kenmore'],
  'Mercer Island': ['Bellevue', 'Seattle', 'Kirkland'],
  'Medina': ['Bellevue', 'Clyde Hill', 'Hunts Point', 'Kirkland'],
  'Clyde Hill': ['Bellevue', 'Medina', 'Hunts Point', 'Kirkland'],
  'Hunts Point': ['Medina', 'Clyde Hill', 'Bellevue', 'Kirkland'],
};

const cityMetaDescriptions = {
  'Seattle': 'Professional Christmas light installation in Seattle, WA. Serving Capitol Hill, Queen Anne, Magnolia, Wallingford, West Seattle, and Laurelhurst. Custom designs, maintenance, and storage included.',
  'Kenmore': 'Christmas light installation in Kenmore, WA -- our home base near Lake Washington. Serving Inglewood, Arrowhead Point, and the Kenmore waterfront. Full-service design, install, and storage.',
  'Kirkland': 'Christmas light installation in Kirkland, WA. Serving Houghton, Bridle Trails, Juanita, and the Kirkland waterfront. Custom roofline and tree lighting with full-service maintenance and storage.',
  'Bellevue': 'Christmas light installation in Bellevue, WA. From downtown condos to estates in Medina and Clyde Hill. Modern warm white LED designs with full-service installation and storage.',
  'Woodinville': 'Christmas light installation in Woodinville, WA. Grand designs for wine country properties with illuminated driveways, wrapped trees, and rustic warm lighting. Full-service including storage.',
  'Bothell': 'Christmas light installation in Bothell, WA. Serving Norway Hill, North Creek, Canyon Park, and historic downtown. Custom designs for both new and classic homes with full-service storage.',
  'Lake Forest Park': 'Christmas light installation in Lake Forest Park, WA. Specializing in tree wraps for towering evergreens and nature-focused designs. Full-service from installation to off-season storage.',
  'Everett': 'Christmas light installation in Everett, WA. Serving Bayside, Silver Firs, and neighborhoods across Snohomish County. Durable commercial-grade LEDs with full-service maintenance and storage.',
  'Lynnwood': 'Christmas light installation in Lynnwood, WA. From elegant rooflines to elaborate yard displays near Alderwood Mall and Meadowdale. Complete service with maintenance and off-season storage.',
  'Shoreline': 'Christmas light installation in Shoreline, WA. Serving The Highlands, Richmond Beach, and Ridgecrest with elegant warm white designs. Full-service installation, maintenance, and storage.',
  'Mercer Island': 'Christmas light installation on Mercer Island, WA. Custom displays for waterfront estates and tree-lined streets. Rooflines, driveways, and mature tree wraps with full-service storage.',
  'Medina': 'Christmas light installation in Medina, WA. Custom designs for large estates featuring architectural highlights, landscape lighting, and dramatic tree wraps. Full-service with off-season storage.',
  'Clyde Hill': 'Christmas light installation in Clyde Hill, WA. Sophisticated designs for stately homes with clean roofline outlining and wrapped columnar trees. All-inclusive service with storage.',
  'Hunts Point': 'Christmas light installation in Hunts Point, WA. Exclusive custom installations for waterfront estates. Full-service from consultation and design to takedown and off-season storage.',
};

const cityContent = {
  'Seattle': {
    text: "From Capitol Hill's classic homes to West Seattle's stunning views, we bring cozy holiday light displays to the city's diverse neighborhoods. Seattle's winters make our durable, commercial-grade LED lights the perfect choice. Our all-inclusive service means takedown and storage are always handled.",
    images: [
      { src: 'https://images.unsplash.com/photo-1595872018818-97555653a011?q=80&w=800', alt: 'Cozy Christmas lights on a Tudor style house in a Seattle neighborhood' },
      { src: 'https://images.unsplash.com/photo-1595013979794-3372ef305a8f?q=80&w=800', alt: 'Modern Seattle home with warm white holiday lights along the roofline' },
      { src: 'https://images.unsplash.com/photo-1641413591043-146cbc34192c?q=80&w=800', alt: 'Warm white roofline lights on two-story home in Seattle, WA' }
    ]
  },
  'Kenmore': {
    text: "As our home base, we love brightening Kenmore for the holidays. Nestled along Lake Washington, local homes are perfect for beautiful waterfront light displays. Popular designs in neighborhoods like Inglewood and Arrowhead Point often include wrapping large evergreen trees. Plus, our service always includes takedown and storage.",
    images: [
      { src: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?q=80&w=800', alt: 'Subtle and elegant Christmas light design on a home in Kenmore' },
      { src: 'https://images.unsplash.com/photo-1599472696777-95cab5e0f891?q=80&w=800', alt: 'A Kenmore driveway and trees adorned with festive holiday lights' },
      { src: 'https://images.unsplash.com/photo-1695634504151-d72065870aa6?q=80&w=800', alt: 'Waterfront home in Kenmore, WA with beautiful holiday lighting' }
    ]
  },
  'Kirkland': {
    text: "Kirkland's vibrant waterfront and charming neighborhoods inspire beautiful holiday displays. We often install crisp roofline lighting on homes in Houghton and Bridle Trails. With our all-inclusive service, you don't have to worry about a thing. We even handle the takedown and storage after the season.",
    images: [
      { src: 'https://images.unsplash.com/photo-1595872018818-97555653a011?q=80&w=800', alt: 'Classic Christmas roofline lights on a two-story home in Kirkland' },
      { src: 'https://images.unsplash.com/photo-1595013979794-3372ef305a8f?q=80&w=800', alt: 'Net lights covering bushes at a Kirkland residence for the holidays' },
      { src: 'https://images.unsplash.com/photo-1641413591043-146cbc34192c?q=80&w=800', alt: 'Icicle-style Christmas lights hanging from a home in Kirkland' }
    ]
  },
  'Bellevue': {
    text: "In Bellevue, we work on a wide range of properties, from downtown high-rises to sprawling estates in Medina and Clyde Hill. Modern designs with warm white LED lights are particularly popular. Our service is completely hands-off for you, as every installation includes maintenance, takedown, and storage.",
    images: [
      { src: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?q=80&w=800', alt: 'Modern Bellevue home with warm white LED Christmas lights along the eaves' },
      { src: 'https://images.unsplash.com/photo-1599472696777-95cab5e0f891?q=80&w=800', alt: 'Icicle Christmas lights hanging from a home in a Bellevue neighborhood' },
      { src: 'https://images.unsplash.com/photo-1695634504151-d72065870aa6?q=80&w=800', alt: 'Beautifully decorated home in Bellevue with warm white holiday lights' }
    ]
  },
  'Woodinville': {
    text: "Known for its spacious properties, Woodinville is the perfect canvas for grand holiday lighting. Designs here often incorporate landscape features, with illuminated driveways and wrapped trees. The rustic feel of the area pairs beautifully with warm lighting, and our included takedown and storage service makes it effortless.",
    images: [
      { src: 'https://images.unsplash.com/photo-1595872018818-97555653a011?q=80&w=800', alt: 'Woodinville property with trees and walkways lit for the Christmas season' },
      { src: 'https://images.unsplash.com/photo-1595013979794-3372ef305a8f?q=80&w=800', alt: 'Lush green garland and wreaths on a Woodinville home' },
      { src: 'https://images.unsplash.com/photo-1641413591043-146cbc34192c?q=80&w=800', alt: 'Rustic home in Woodinville with festive warm Christmas lights' }
    ]
  },
  'Bothell': {
    text: "With a mix of historic homes and new developments, Bothell offers a wonderful variety of lighting opportunities. We help homeowners on Norway Hill highlight their views and families in North Creek create festive displays. Our service is always all-inclusive, so takedown and storage are taken care of.",
    images: [
      { src: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?q=80&w=800', alt: 'Two-story Bothell home with classic warm white Christmas lights' },
      { src: 'https://images.unsplash.com/photo-1599472696777-95cab5e0f891?q=80&w=800', alt: 'Warm white roofline lights on a cozy home in Bothell, WA' },
      { src: 'https://images.unsplash.com/photo-1695634504151-d72065870aa6?q=80&w=800', alt: 'Festive entryway lighting on a Bothell, WA suburban home' }
    ]
  },
  'Lake Forest Park': {
    text: "Characterized by its towering trees, Lake Forest Park is ideal for enchanting, nature-focused lighting designs. We specialize in wrapping tall evergreens to create a 'winter wonderland' effect. Every job includes full service, from installation to takedown and storage, making the process seamless for you.",
    images: [
      { src: 'https://images.unsplash.com/photo-1595872018818-97555653a011?q=80&w=800', alt: 'Tall evergreen trees wrapped in warm white Christmas lights in Lake Forest Park' },
      { src: 'https://images.unsplash.com/photo-1595013979794-3372ef305a8f?q=80&w=800', alt: 'A house in a wooded area of Lake Forest Park with subtle holiday lighting' },
      { src: 'https://images.unsplash.com/photo-1641413591043-146cbc34192c?q=80&w=800', alt: 'An illuminated pathway in a wooded Lake Forest Park property' }
    ]
  },
   'Everett': {
    text: "We bring holiday cheer to Everett, lighting up everything from historic homes in the Bayside neighborhood to modern houses in Silver Firs. Our durable, bright lights are perfect for Everett's festive spirit, and our all-inclusive package covers everything from setup to storage.",
    images: [
      { src: 'https://images.unsplash.com/photo-1606941519844-93b33f2d2b56?q=80&w=800', alt: 'A charming home in Everett with colorful Christmas lights' },
      { src: 'https://images.unsplash.com/photo-1607577884879-1b058a5c432c?q=80&w=800', alt: 'A suburban home in Everett with clean, warm white roofline lighting' },
      { src: 'https://images.unsplash.com/photo-1574538198188-39f99335f66b?q=80&w=800', alt: 'Trees wrapped in festive lights on a property in Everett, WA' }
    ]
  },
   'Lynnwood': {
    text: "In Lynnwood, we help homeowners create bright, inviting displays that stand out. From simple, elegant rooflines to elaborate yard decorations, our team handles it all. Enjoy a hassle-free holiday with our complete service, including maintenance and storage.",
    images: [
      { src: 'https://images.unsplash.com/photo-1512167193254-2a65a3f2828b?q=80&w=800', alt: 'A beautiful home in Lynnwood with icicle lights and pathway lighting' },
      { src: 'https://images.unsplash.com/photo-1606941519844-93b33f2d2b56?q=80&w=800', alt: 'A two-story home in Lynnwood with festive multi-color lights' },
      { src: 'https://images.unsplash.com/photo-1544903543-9883595c2e39?q=80&w=800', alt: 'A close-up of bright Christmas lights on a Lynnwood home' }
    ]
  },
   'Shoreline': {
    text: "Shoreline's beautiful neighborhoods, like The Highlands and Richmond Beach, are perfect for classic holiday light designs. We specialize in creating elegant, timeless looks with warm white lights that complement your home's style. Our service includes everything, so you can just enjoy the view.",
    images: [
      { src: 'https://images.unsplash.com/photo-1606941519844-93b33f2d2b56?q=80&w=800', alt: 'An elegant home in Shoreline with warm white Christmas lights' },
      { src: 'https://images.unsplash.com/photo-1512167193254-2a65a3f2828b?q=80&w=800', alt: 'A house in a Shoreline neighborhood with a festive lighting display' },
      { src: 'https://images.unsplash.com/photo-1574538198188-39f99335f66b?q=80&w=800', alt: 'A decorated tree in front of a Shoreline home, lit for the holidays' }
    ]
  },
  'Mercer Island': {
    text: "Mercer Island's waterfront estates and tree-lined streets are the perfect setting for holiday lighting. We design custom displays that complement the island's architecture, from roofline installations to illuminated driveways and mature trees. Our full-service package includes design, installation, maintenance, takedown, and storage.",
    images: [
      { src: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?q=80&w=800', alt: 'Luxury home on Mercer Island with elegant warm white holiday lights' },
      { src: 'https://images.unsplash.com/photo-1599472696777-95cab5e0f891?q=80&w=800', alt: 'Waterfront property on Mercer Island decorated with festive lighting' },
      { src: 'https://images.unsplash.com/photo-1695634504151-d72065870aa6?q=80&w=800', alt: 'Tree-lined driveway on Mercer Island illuminated with Christmas lights' }
    ]
  },
  'Medina': {
    text: "Medina is home to some of the most impressive properties in the Pacific Northwest, and they deserve holiday lighting to match. Our team creates custom designs for large properties, incorporating architectural highlights, landscape features, and dramatic tree wraps. Every installation includes our full-service package with maintenance, takedown, and off-season storage.",
    images: [
      { src: 'https://images.unsplash.com/photo-1595872018818-97555653a011?q=80&w=800', alt: 'Grand estate in Medina with professionally installed Christmas lights' },
      { src: 'https://images.unsplash.com/photo-1595013979794-3372ef305a8f?q=80&w=800', alt: 'Elegant holiday lighting on a luxury Medina property' },
      { src: 'https://images.unsplash.com/photo-1641413591043-146cbc34192c?q=80&w=800', alt: 'Warm white lights illuminating a Medina home and landscape' }
    ]
  },
  'Clyde Hill': {
    text: "Clyde Hill's stately homes and manicured landscapes are ideal for sophisticated holiday lighting designs. We work with homeowners to create displays that enhance their property's curb appeal while maintaining an elegant aesthetic. From clean roofline outlining to wrapped columnar trees, our all-inclusive service handles every detail including storage.",
    images: [
      { src: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?q=80&w=800', alt: 'Stately Clyde Hill home with classic roofline Christmas lights' },
      { src: 'https://images.unsplash.com/photo-1599472696777-95cab5e0f891?q=80&w=800', alt: 'Elegant holiday display on a Clyde Hill property' },
      { src: 'https://images.unsplash.com/photo-1695634504151-d72065870aa6?q=80&w=800', alt: 'Professionally lit landscape at a Clyde Hill residence' }
    ]
  },
  'Hunts Point': {
    text: "Hunts Point is one of the most exclusive communities in Washington, and our team creates custom installations that match. We design displays that highlight each property while adding festive warmth. We handle everything from initial consultation to post-season storage.",
    images: [
      { src: 'https://images.unsplash.com/photo-1595872018818-97555653a011?q=80&w=800', alt: 'Exclusive Hunts Point estate with designer holiday lighting' },
      { src: 'https://images.unsplash.com/photo-1595013979794-3372ef305a8f?q=80&w=800', alt: 'Waterfront estate in Hunts Point decorated for the holidays' },
      { src: 'https://images.unsplash.com/photo-1641413591043-146cbc34192c?q=80&w=800', alt: 'Grand entrance of a Hunts Point property with warm festive lights' }
    ]
  }
};


const ServiceAreaCityPage = ({ city }) => {
  useStickyCta();
  const content = cityContent[city] || { text: `Learn about our services in ${city}.`, images: [] };
  const cityPath = cityNameToPath[city] || city.toLowerCase().replace(/\s+/g, '-');
  const metaDescription = cityMetaDescriptions[city] || `Professional, all-inclusive Christmas light installation in ${city}, WA. Custom designs, maintenance, takedown, and storage. Get your free quote today.`;
  const pageTitle = `Christmas Light Installation in ${city}, WA | Seattle Christmas Lights`;
  const pageUrl = `https://lightseattle.com/service-areas/${cityPath}`;
  const nearby = (nearbyAreas[city] || []).filter(c => cityNameToPath[c]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1541127066115-5500b56287ac" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://lightseattle.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Service Areas",
              "item": "https://lightseattle.com/service-areas"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": city,
              "item": pageUrl
            }
          ]
        })}</script>
      </Helmet>
      <div className="bg-background-alt border-b section-padding">
        <div className="container-content text-center">
          <h1 className="h1 mb-4">{`Christmas Light Installation in ${city}, WA`}</h1>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-content">
          <div className="mb-8">
            <Button as={Link} to="/service-areas" variant="ghost" className="text-muted-foreground hover:text-primary">
              <ArrowLeft size={16} className="mr-2"/>
              Back to service areas
            </Button>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="p-body text-muted-foreground">{content.text}</p>
              <div className="bg-primary/5 border border-primary/10 text-primary font-semibold p-4 rounded-2xl flex items-center gap-x-3">
                <CheckCircle size={20} />
                <span>Takedown & storage included with every install</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {content.images.slice(0, 2).map((img, i) => (
                    <ImageOptimizer
                        key={i}
                        src={img.src}
                        alt={img.alt}
                        className="rounded-2xl w-full h-full object-cover aspect-square" />
                ))}
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.images.map((img, i) => (
                    <ImageOptimizer
                        key={i}
                        src={img.src}
                        alt={img.alt}
                        className="rounded-2xl w-full h-full object-cover aspect-[4/3]" />
                ))}
          </div>

          <div className="mt-16 bg-background-alt rounded-2xl border p-8 text-center" data-cta-section>
            <h2 className="h2 text-foreground mb-2">Get your free quote in {city}!</h2>
            <p className="p-body max-w-xl mx-auto text-muted-foreground mb-6">
              Ready to make your home shine? Contact us for a no-obligation estimate.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button as={Link} to="/contact" className="btn-primary">
                <Edit className="w-5 h-5 mr-2" />
                Get my free quote
              </Button>
              <Button as="a" href="tel:4254484998" className="btn-secondary">
                <Phone className="w-5 h-5 mr-2" />
                Call (425) 448-4998
              </Button>
            </div>
          </div>

          {nearby.length > 0 && (
            <div className="mt-16">
              <h2 className="h2 text-foreground mb-8 text-center">Nearby Service Areas</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {nearby.map(nearbyCity => (
                  <Link
                    key={nearbyCity}
                    to={`/service-areas/${cityNameToPath[nearbyCity]}`}
                    className="card bg-background-alt border p-5 flex items-center gap-3 hover:border-primary transition-colors"
                  >
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-semibold text-foreground">{nearbyCity}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default ServiceAreaCityPage;
