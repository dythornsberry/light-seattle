import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import ImageOptimizer from '@/components/ImageOptimizer';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Copyright } from 'lucide-react';
import { useLightbox } from '@/context/LightboxContext.jsx';

const allGalleryItems = [
  { category: ['Full Property', 'Recent'], neighborhood: 'Sammamish', caption: 'Modern Home Display', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/235ceaa2084f6c3595a109b98d39821c.jpg' },
  { category: ['Rooflines', 'Recent'], neighborhood: 'Bothell', caption: 'Classic Roofline Lighting', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/990c3274b03bd096a71395c6d8043d8f.jpg' },
  { category: ['Rooflines', 'Recent'], neighborhood: 'Woodinville', caption: 'Elegant Estate Lighting', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/bbdfd94b8a02b1fa84fd1945cbf8a98e.jpg' },
  { category: ['Trees'], neighborhood: 'Redmond', caption: 'Garden Tree Glow', year: 2023, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/32793875a114f9e0544f2b81a91def79.jpg' },
  { category: ['Rooflines'], neighborhood: 'Queen Anne', caption: 'Inviting Home Lighting', year: 2023, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/e183bc2de4611cff0af52451cc42ce48.png' },
  { category: ['Rooflines', 'Full Property'], neighborhood: 'Issaquah', caption: 'Festive Home Display', year: 2023, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/d0d47a07afe8718cf098c605b0c86c64.webp' },
  { category: ['Full Property'], neighborhood: 'Kenmore', caption: 'Colorful Christmas Home', year: 2022, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/9a64df3abf6bc952ee0708156d55d3a5.jpg' },
  { category: ['Full Property', 'Recent'], neighborhood: 'Snoqualmie', caption: 'Entry Gate Lighting', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/2a1755975470dff4557e8fe3d51e6f67.webp' },
  { category: ['Full Property'], neighborhood: 'Maple Valley', caption: 'Winter Wonderland Display', year: 2023, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/80b2ff7622e5483fa3a1f5036a13f509.jpg' },
  { category: ['Trees'], neighborhood: 'Issaquah', caption: 'Wrapped Tree Lighting', year: 2023, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/0f15d9c8affffe209df8a7331c04e80c.png' },
  { category: ['Full Property'], neighborhood: 'Redmond', caption: 'Classic Home Lighting', year: 2022, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/96b59b6610be14e8ae1b1912e894e2e4.jpg' },
  { category: ['Rooflines'], neighborhood: 'Kirkland', caption: 'Modern Roofline Style', year: 2022, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/5f3035c7c85c90eb72a39b0dc5a3e454.jpg' },
  { category: ['Full Property', 'Recent'], neighborhood: 'Lynnwood', caption: 'Red & White Home Lighting', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/a885e41a3786af553f91476ed6121d32.jpg' },
  { category: ['Full Property', 'Recent'], neighborhood: 'Mercer Island', caption: 'Colorful Home Display', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/2d3281c7da1e67e95b6fee3e9e2a842a.jpg' },
  { category: ['Rooflines'], neighborhood: 'Bothell', caption: 'Rainbow Roofline Lighting', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/7b7ae981d47b969a524888869e4dd0da.jpg' },
  { category: ['Full Property', 'Rooflines'], neighborhood: 'Sammamish', caption: 'Classic Red & White Display', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/cbc03894a67835ad9476751b9d38f5c2.jpg' },
  { category: ['Rooflines'], neighborhood: 'Kirkland', caption: 'Festive Green & Red Roofline', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/56d666672e0cf768428604e8db4b9e70.jpg' },
  { category: ['Full Property'], neighborhood: 'Seattle', caption: 'Porch Glow Lighting', year: 2023, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/7c80a23c276fe201d966ec497bbcfb2a.jpg' },
  { category: ['Full Property'], neighborhood: 'Issaquah', caption: 'Traditional Home Lighting', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/33a2baf27567f8b9f270996571ba065e.jpg' },
  { category: ['Full Property'], neighborhood: 'Redmond', caption: 'Warm White Roofline', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/49563b654a08482eca22f0a3090b7ad0.jpg' },
  { category: ['Rooflines'], neighborhood: 'Bothell', caption: 'Red & Green Gables', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/b95582c51a249a67888037ded5533252.jpg' },
  { category: ['Full Property'], neighborhood: 'Seattle', caption: 'White & Red Classic Display', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/a488dcbb413fbf0e95b677412cf7baa1.jpg' },
  { category: ['Full Property', 'Rooflines'], neighborhood: 'Sammamish', caption: 'Festive Roofline Display', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/8cfb77b99a184993b1f932d9d29691e0.jpg' },
  { category: ['Full Property'], neighborhood: 'Seattle', caption: 'Warm White Porch Lighting', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/95798a52ac5092fd43b1adc2ee8fe7d3.jpg' },
  { category: ['Full Property', 'Rooflines'], neighborhood: 'Woodinville', caption: 'Classic Holiday Lights', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/e12dd655e05126900c879f8600b89bec.jpg' },
  { category: ['Full Property', 'Trees'], neighborhood: 'Seattle', caption: 'Modern Home with Tree Lighting', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/46deed693d6a52e864742bf7ae390cfa.jpg' },
  { category: ['Rooflines'], neighborhood: 'Bellevue', caption: 'Elegant Roofline Lighting', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/917569de90e593c41cae29fdd4ea5e3b.jpg' },
  { category: ['Full Property', 'Rooflines'], neighborhood: 'Sammamish', caption: 'Warm White Roofline and Wreath', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/77f48b36940ee868ef0c64d88ae07907.jpg' },
  { category: ['Full Property', 'Trees'], neighborhood: 'Bothell', caption: 'Multi-color Tree and Warm White Roof', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/0c838ea46d9ea001809c0f8951533e07.jpg' },
  { category: ['Full Property', 'Rooflines'], neighborhood: 'Sammamish', caption: 'Home with Green Uplighting', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/9071779e39d2eeecd677bd775ee9558a.jpg' },
  { category: ['Full Property', 'Rooflines'], neighborhood: 'Bothell', caption: 'Garage with Warm White Lights and Wreath', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/03e526ca81d79626d96ca717a446d0d2.jpg' },
  { category: ['Full Property', 'Rooflines'], neighborhood: 'Sammamish', caption: 'Home with Warm White Roofline', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/df396926d329aa7395d6c511d2747676.jpg' },
  { category: ['Full Property', 'Rooflines'], neighborhood: 'Bothell', caption: 'Home with Warm White Roofline and Reindeer', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/5b74f72f0d7ce55a601aed3e7375310a.jpg' },
  { category: ['Full Property', 'Rooflines'], neighborhood: 'Bothell', caption: 'Home with Red and White Roofline Lights', year: 2024, imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/517856dfd63be5220f6a53903e79922e.jpg' },
  { category: ['Full Property', 'Recent'], caption: 'Cozy Home with Full Lighting', imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/69e77e6a73d2f25dc0fddf367b9c6244.webp' },
  { category: ['Full Property', 'Rooflines', 'Recent'], caption: 'Elegant Estate with Wreath', imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/eaadf45f3551924b0fcec3671b34b607.webp' },
  { category: ['Full Property', 'Rooflines'], caption: 'Charming Home with Wreaths', imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/ce48801541cf2217465917a634b4add4.webp' },
  { category: ['Full Property', 'Trees', 'Recent'], caption: 'Brightly Lit Tree and Home', imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/d8c6cab5281de0583599e22ee0ea1bbd.webp' },
  { category: ['Full Property', 'Rooflines'], caption: 'Festive Red and White Lights', imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/e9801b7b43855577a4c0076ead638a1b.webp' },
  { category: ['Full Property', 'Trees'], caption: 'Warmly Lit Tree and House', imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/745688e26a58758b4dc8c67c1dc8e127.webp' },
  { category: ['Full Property', 'Rooflines', 'Recent'], caption: 'Patriotic Red and Blue Lights', imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/44acdea9569a33cda9a195b7b4f8df4b.webp' },
  { category: ['Trees', 'Recent'], caption: 'Enchanting Pathway with Lit Trees', imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/bc42009db4c2f40ba9ca749ecf441a40.webp' },
  { category: ['Full Property'], caption: 'Subtle and Classy Home Lighting', imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/9f3e6664c053b1463aadbe6b559a13e9.webp' },
  { category: ['Full Property', 'Rooflines'], caption: 'Grand Home with Garage Lighting', imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/8d809437d509028834e54a0d5c9492e6.webp' },
  { category: ['Full Property', 'Rooflines', 'Recent'], caption: 'Modern Home with Snowy Roof', imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/ca59239f63793414b4f93946aa154414.webp' },
  { category: ['Full Property', 'Rooflines'], caption: 'Stately Home with Gabled Roofs', imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/6931e46c5b7dee6be3b141a279bf866f.webp' },
  { category: ['Full Property'], caption: 'Classic Home with Holiday Decor', imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/09726d381a47aed7588203a6173b00bc.webp' },
  { category: ['Full Property', 'Trees', 'Recent'], caption: 'Vibrant Multi-Colored Display', imgSrc: 'https://horizons-cdn.hostinger.com/171f68ec-1f0f-4ba5-93d7-9cf020f2c5cd/2aa45986ebf4eaa1d02e563e38a54209.webp' },
];

const filters = ['All', 'Recent', 'Rooflines', 'Trees', 'Full Property', 'Commercial'];

const StatisticsBar = () => (
    <div className="bg-background-alt border-y">
        <div className="container-max py-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm md:text-base">
                <p className="font-semibold text-foreground">300+ Homes Illuminated</p>
                <p className="font-semibold text-foreground">48-Hour Service Guarantee</p>
                <p className="font-semibold text-foreground">85% Return Customers</p>
                <p className="font-semibold text-foreground">Rated 5.0 on Google</p>
            </div>
        </div>
    </div>
);

const GalleryCard = ({ item }) => {
  const { openLightbox } = useLightbox();
  return (
    <motion.div 
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg cursor-pointer"
        onClick={() => openLightbox(item.imgSrc, item.caption)}
    >
        <ImageOptimizer
            src={item.imgSrc}
            alt={item.caption}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 p-4 w-full transition-transform duration-300 translate-y-full group-hover:translate-y-0">
            <p className="font-medium text-white text-base tracking-wide" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}>{item.caption}</p>
            <p className="text-sm text-primary font-semibold">{item.neighborhood}</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center text-white font-bold text-lg bg-black/40 p-2 rounded-lg">
                <Copyright className="w-5 h-5 mr-2" />
                <span>Seattle Christmas Lights</span>
            </div>
        </div>
    </motion.div>
  );
};

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return allGalleryItems;
    return allGalleryItems.filter(item => item.category.includes(activeFilter));
  }, [activeFilter]);

  return (
    <>
      <Helmet>
        <title>Our Work | Seattle Christmas Lights</title>
        <meta name="description" content="Explore our portfolio of bespoke holiday lighting designs from across the Greater Seattle area." />
      </Helmet>
      
      <PageHeader
        title="Our Work"
        subtitle="Explore our portfolio of bespoke holiday lighting designs from across the Greater Seattle area."
      />
      
      <StatisticsBar />

      <section className="section-padding bg-background-alt">
        <div className="container-max">
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {filters.map(filter => (
                    <Button 
                        key={filter}
                        variant={activeFilter === filter ? "default" : "outline"}
                        onClick={() => setActiveFilter(filter)}
                        className="capitalize"
                    >
                        {filter}
                    </Button>
                ))}
            </div>
            
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                 <AnimatePresence>
                    {filteredItems.map(item => <GalleryCard key={item.imgSrc} item={item} />)}
                 </AnimatePresence>
            </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background border-t" data-cta-section>
          <div className="container-content text-center">
              <h2 className="h2 text-foreground mb-2">Ready to light up your home?</h2>
              <p className="p-body text-muted-foreground mb-6">Let's discuss your custom design, by phone or in-person.</p>
              <Button as={Link} to="/contact" size="lg" className="btn-primary text-lg">
                Get Your Custom Design
              </Button>
          </div>
      </section>
    </>
  );
};