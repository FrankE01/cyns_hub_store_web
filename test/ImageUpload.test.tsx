import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ImageUploadField from "@/components/admin/ImageUploadField";

describe("ImageUploadField Component", () => {
  it("renders with default upload mode and dropzone", () => {
    const onChange = vi.fn();
    render(
      <ImageUploadField
        label="Department Cover Image"
        value=""
        onChange={onChange}
        helperText="Upload or enter URL"
      />
    );

    expect(screen.getByText("Department Cover Image")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /upload file/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /image link/i })).toBeInTheDocument();
    expect(
      screen.getByText(/click to browse or drag & drop image here/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Upload or enter URL")).toBeInTheDocument();
  });

  it("switches to Image Link mode and updates URL", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <ImageUploadField
        label="Cover Image"
        value=""
        onChange={onChange}
      />
    );

    // Switch to link mode
    await user.click(screen.getByRole("button", { name: /image link/i }));
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    await user.type(input, "https://images.unsplash.com/photo-test");
    expect(onChange).toHaveBeenCalled();

    // Rerender with new value to verify thumbnail preview in link mode
    rerender(
      <ImageUploadField
        label="Cover Image"
        value="https://images.unsplash.com/photo-test"
        onChange={onChange}
      />
    );

    expect(screen.getByAltText("URL Preview")).toBeInTheDocument();
  });

  it("processes file upload and calls onChange with Data URL", async () => {
    const onChange = vi.fn();
    render(
      <ImageUploadField
        label="Hero Photo"
        value=""
        onChange={onChange}
      />
    );

    const file = new File(["dummy image content"], "sample.jpg", {
      type: "image/jpeg",
    });

    const fileInput = screen.getByLabelText(/hero photo/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(expect.stringMatching(/^data:image\/jpeg;base64,/));
    });
  });

  it("rejects oversized files exceeding 5MB limit", async () => {
    const onChange = vi.fn();
    render(
      <ImageUploadField
        label="Hero Photo"
        value=""
        onChange={onChange}
      />
    );

    // Create a 6MB mock file
    const largeBlob = new Uint8Array(6 * 1024 * 1024);
    const largeFile = new File([largeBlob], "huge.jpg", { type: "image/jpeg" });

    const fileInput = screen.getByLabelText(/hero photo/i);
    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    await waitFor(() => {
      expect(
        screen.getByText(/image file exceeds the 5mb limit/i)
      ).toBeInTheDocument();
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  it("renders uploaded image preview and supports removal", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <ImageUploadField
        label="Cover Image"
        value="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        onChange={onChange}
      />
    );

    expect(screen.getByText(/uploaded image/i)).toBeInTheDocument();
    const removeBtn = screen.getByRole("button", { name: /remove/i });
    expect(removeBtn).toBeInTheDocument();

    await user.click(removeBtn);
    expect(onChange).toHaveBeenCalledWith("");
  });
});
