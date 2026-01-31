import { ThemedView } from "@/components/themed-view";
import { useSearchContext } from "@/features/search/context/search-context";
import { ScrollView, StyleSheet, View } from "react-native";
import { useArticle } from "../hooks/useArticle";
import { ArticleHeader } from "./article-header";
import { DownloadButton } from "./downloadButton";
import { MarkdownRenderer } from "./markdown-renderer";
import { Ratings } from "./ratings";
import { Ticket } from "./ticket";

const testContent = {
  operatingHours: "12:00 - 21:30",
  relativePrice: "LOW" as 'LOW' | 'MID' | 'HIGH',
};

// const markdown: string = `
// ## TIMETABLES

// * Digital displays and route maps at major stops and terminals.
// * Official transit mobile app with route maps, stop lists, and real-time departures.
// * Journey planner integrated into the regional public transport system.

// ## PURCHASE

// Bus travel is included in the city-wide public transport ticket for Malmö (local zone). City-wide tickets can be purchased digitally or at authorized sales points before boarding.

// * App/Online: Official Skånetrafiken mobile app.
// * Machines: Ticket machines at major stations and selected stops.

// ## DISCOUNTS

// * Student: Valid student status verified with an approved student card (for example, ISIC or Swedish student card).
// * Senior: Age-based eligibility verified with photo ID.
// * Child/Youth: Age-based eligibility verified by age declaration or ID when requested.

// ## HINTS

// * Tickets must be purchased and activated before boarding; onboard sales are not available.
// * Cash is not accepted on buses.
// * Tickets are validated digitally in the app or automatically upon purchase from machines.
// * Night services may operate on selected routes outside standard hours, especially on weekends.
// * Zone validity matters when traveling beyond Malmö city limits.

// `;

export function ArticlePage() {

  const { articleDelimiter } = useSearchContext();
  const { article } = useArticle(articleDelimiter);

  return (
    <ThemedView style={styles.container}>
      <ArticleHeader locationText={articleDelimiter.location} style={styles.header} />
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.content}>
          <Ticket delimiter={articleDelimiter} content={testContent} style={styles.ticket} />
          <MarkdownRenderer style={styles.markdown} markdown={article?.text} />
        </ThemedView>
      </ScrollView>
      <View style={styles.lowBar}>
        <Ratings positive={4} negative={1} available={true} userRating="negative" style={styles.ratings} />
        <DownloadButton available={true} onPress={() => {}} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    zIndex: 0,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  content: {
    alignItems: 'stretch',
    marginTop: 200,
    minHeight: 100,
    borderRadius: 16,
  },
  ticket: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  markdown: {
    marginBottom: 240,
    paddingHorizontal: 24,
  },
  lowBar: {
    gap: 16,
    flexDirection: 'row',
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 16,
    marginBottom: 64,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  ratings: {
    height: '100%',
    flex: 1,
  },
});