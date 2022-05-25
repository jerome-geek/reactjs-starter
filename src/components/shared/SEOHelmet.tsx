import { HelmetProvider, Helmet } from 'react-helmet-async';

interface SEOData {
    data: {
        title?: string;
        canonical?: string;
        meta?: {
            title?: string;
            description?: string;
            image?: string;
        };
        og?: {
            title?: string;
            description?: string;
            image?: string;
        };
        twitter?: {
            card?: string;
            title?: string;
            description?: string;
            image?: string;
        };
        itemprop?: {
            name?: string;
            description?: string;
            image?: string;
        };
    };
}

const SEOHelmet = ({ data }: SEOData) => {
    const config = { title: 'Voice Caddie', description: '' };

    return (
        <HelmetProvider>
            <Helmet>
                {/* 타이틀  */}
                <title>{data.title || config.title}</title>
                {/* Canonical tag */}
                {data.canonical && (
                    <link rel='canonical' href={data.canonical} />
                )}
                {/* 메타데이터 */}
                {data.meta?.title && (
                    <meta
                        name='title'
                        content={data.meta.title || config.title}
                    />
                )}
                {data.meta?.description && (
                    <meta
                        name='description'
                        content={data.meta.description || config.description}
                    />
                )}
                {/* 오픈그래프 */}
                <meta property='og:type' content='website' />
                {data.og?.title && (
                    <meta property='og:title' content={data.og.title} />
                )}
                {data.og?.description && (
                    <meta
                        property='og:description'
                        content={data.og.description}
                    />
                )}
                {data.og?.image && (
                    <meta property='og:image' content={data.og.image} />
                )}
                {/* 트위터 */}
                {data.twitter?.card && (
                    <meta property='twitter:card' content={data.twitter.card} />
                )}
                {data.twitter?.title && (
                    <meta
                        property='twitter:title'
                        content={data.twitter.title}
                    />
                )}
                {data.twitter?.description && (
                    <meta
                        property='twitter:description'
                        content={data.twitter.description}
                    />
                )}
                {data.twitter?.image && (
                    <meta
                        property='twitter:image'
                        content={data.twitter.image}
                    />
                )}
                {/* itemprop */}
                {data.itemprop?.name && (
                    <meta itemProp='name' content={data.itemprop.name || ''} />
                )}
                {data.itemprop?.description && (
                    <meta
                        itemProp='description'
                        content={data.itemprop.description || ''}
                    />
                )}
                {data.itemprop?.image && (
                    <meta
                        itemProp='image'
                        content={data.itemprop.image || ''}
                    />
                )}
            </Helmet>
        </HelmetProvider>
    );
};

export default SEOHelmet;
