import { useQuery, gql } from '@apollo/client';
import Image from 'next/image';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  NavigationMenu,
  Hero,
  SEO,
} from '../components';

export default function Component(props) {
  const { data } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];
  const { heroImage, heroH1, heroCopy } = props?.data?.page.homeOptions ?? [];

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <Container>
          <Hero title={siteTitle} />
          <div className="text-center">
            {siteDescription}
            <Image 
                    src={heroImage.sourceUrl}
                    alt={heroImage.altText}
                    width={heroImage.mediaDetails.width}
                    height={heroImage.mediaDetails.height} />
            <h1>{heroH1}</h1>
            <p>{heroCopy}</p>
          </div>
        </Container>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    page(id: 51, idType: DATABASE_ID)  {
      homeOptions {
        heroImage {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        heroH1
        heroCopy
        ctaBtn1
        hornsH2
        card1
        card2
        card3
        weAreH2
        weAreCopy
        weAreBtnUrl
        weAreBtnText
        trustH2
        trustCode
        weServeH2
        servicesH2
        studiesH2
        studiesCopy
        studiesBtnUrl
        studiesBtnText
        ctaBtn2
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
