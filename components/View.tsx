"use client";

import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { useEffect, useState } from "react";

const View = ({ id }: { id: string }) => {
  const [totalViews, setTotalViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchAndUpdateViews = async () => {
      try {
        // Fetch the current view count
        const { views } = await client
          .withConfig({ useCdn: false })
          .fetch(STARTUP_VIEWS_QUERY, { id });

        setTotalViews(views);

        // Update the views using the API route
        await fetch("/api/updateViews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, views: views + 1 }),
        });
      } catch (error) {
        console.error("Failed to fetch or update views:", error);
      }
    };

    fetchAndUpdateViews();
  }, [id]);

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">
          Views: {totalViews !== null ? totalViews : "Loading..."}
        </span>
      </p>
    </div>
  );
};

export default View;
