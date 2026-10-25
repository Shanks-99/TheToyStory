
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SupabaseTestPage() {
    const [status, setStatus] = useState("Checking configuration...");

    useEffect(() => {
        async function testConnection() {
            const { error } = await supabase
                .from("connection_test")
                .select("*")
                .limit(1);

            if (error && error.code === "42P01") {
                setStatus(
                    "Connection successful! The test table does not exist yet, which is expected."
                );
            } else if (error && error.code === "PGRST205") {
                setStatus(
                    "Supabase reached, but the test table is not available in the API schema yet. This is expected before we create our tables."
                );
            } else if (error) {
                setStatus(`Supabase responded with: ${error.message}`);
            } else {
                setStatus("Supabase connection successful!");
            }
        }

        testConnection();
    }, []);

    return (
        <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
            <h1>Supabase Connection Test</h1>
            <p>{status}</p>
        </main>
    );
}
